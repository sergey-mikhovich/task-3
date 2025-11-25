import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/core/services/base-query-with-reauth";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Me'],
    endpoints: () => ({})
})