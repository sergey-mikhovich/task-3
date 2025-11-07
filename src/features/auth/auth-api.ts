import {baseApi} from "@/shared/api/base-api";
import {LoginArgs, LoginResponse, User} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginArgs>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
        }),
        me: builder.query<User, void>({
            query: () => 'auth/me'
        })
    })
})

export const {
    useLoginMutation,
    useMeQuery,
    useLazyMeQuery,
} = authApi