import {baseApi} from "@/core/services/base-api";
import {LoginArgs, LoginResponse, User} from "@/modules/auth/models/auth";

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
                    const { data } = await queryFulfilled
                    localStorage.setItem("accessToken", data.accessToken);
                    dispatch(baseApi.util.invalidateTags(['Me']));
                } catch (e) {
                    console.error("Login failed: ", e)
                }
            }
        }),
        me: builder.query<User, void>({
            query: () => ({
                url: 'auth/me',
                method: "GET",
                headers: (() => {
                    const headers = new Headers()
                    const accessToken = localStorage.getItem("accessToken")
                    if (accessToken) {
                        headers.set('Authorization', `Bearer ${accessToken}`);
                    }
                    return headers
                })()
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