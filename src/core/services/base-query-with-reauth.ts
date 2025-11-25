import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {routes} from "@/core/constants/routes";
import {Mutex} from "async-mutex";
import {StorageService} from "@/core/utils/storage-service";
import {TOKENS} from "@/core/constants/local-storage";
import {Tokens} from "@/core/models/tokens";

type RefreshResponse = {
    accessToken: string
    refreshToken: string
}

function isRefreshResponse(response: unknown): response is RefreshResponse {
    return (
        response !== null &&
        typeof response === "object" &&
        typeof (response as any).refreshToken === "string" &&
        typeof (response as any).accessToken === "string"
    )
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: headers => {
        const tokens = StorageService.get<Tokens>(TOKENS)
        if (tokens !== null) {
            headers.set('Authorization', `Bearer ${tokens.accessToken}`);
        }
        return headers
    }
})

type FetchBaseQueryType = typeof baseQuery

const mutex = new Mutex()

export const baseQueryWithReauth: FetchBaseQueryType = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const tokens = StorageService.get<Tokens>(TOKENS)
                const refreshResult = await baseQuery(
                    {
                        url: routes.auth.refresh,
                        method: "POST",
                        headers: (() => new Headers({
                            "Content-Type": "application/json"
                        }))(),
                        body: JSON.stringify({
                            refreshToken: tokens ? tokens.refreshToken : undefined
                        })
                    },
                    api,
                    extraOptions
                )

                const refreshResultData = refreshResult.data

                if (refreshResultData && isRefreshResponse(refreshResultData)) {
                    const {accessToken, refreshToken} = refreshResultData
                    const tokens = {accessToken, refreshToken} satisfies Tokens
                    StorageService.set(TOKENS, tokens)
                    result = await baseQuery(args, api, extraOptions)
                }
            } finally {
                release()
            }
        }
    } else {
        await mutex.waitForUnlock()
        result = await baseQuery(args, api, extraOptions)
    }
    return result
}