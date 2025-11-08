import {useAppDispatch} from "@/core/hooks/use-app-dispatch";
import {baseApi} from "@/core/services/base-api";

export const useLogout = () => {
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(baseApi.util.resetApiState())
        localStorage.removeItem("accessToken")
    };

    return { onLogout }
}