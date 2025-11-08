import {baseApi} from "@/core/services/base-api";
import {LoginArgs, LoginResponse, User} from "@/modules/auth/models/auth";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginArgs>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
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