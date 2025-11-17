import {useAppDispatch} from "@/core/hooks/use-app-dispatch";
import {baseApi} from "@/core/services/base-api";
import {useCallback} from "react";

export const useLogout = () => {
    const dispatch = useAppDispatch()

    const onLogout = useCallback(() => {
        localStorage.removeItem("accessToken")
        dispatch(baseApi.util.resetApiState())
    }, [dispatch]);

    return { onLogout }
}