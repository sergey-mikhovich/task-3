import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "@/core/services/base-api";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export type AppDispatch = typeof store.dispatch