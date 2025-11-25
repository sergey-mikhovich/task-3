import {baseApi} from "@/core/services/base-api";
import {LoginArgs, LoginResponse, User} from "@/modules/auth/models/auth";
import {StorageService} from "@/core/utils/storage-service";
import {TOKENS} from "@/core/constants/local-storage";
import {Tokens} from "@/core/models/tokens";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginArgs>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: (() => new Headers({
                    "Content-Type": "application/json"
                }))()
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data: {accessToken, refreshToken} } = await queryFulfilled
                    const tokens = { accessToken, refreshToken } satisfies Tokens
                    StorageService.set<Tokens>(TOKENS, tokens)
                    dispatch(baseApi.util.invalidateTags(['Me']));
                } catch (e) {
                    console.error("Login failed: ", e)
                }
            }
        }),
        me: builder.query<User, void>({
            query: () => ({
                url: 'auth/me',
                method: "GET"
            }),
            providesTags: ["Me"]
        })
    })
})

export const {
    useLoginMutation,
    useMeQuery,
    useLazyMeQuery,
} = authApi