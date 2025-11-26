import {useAppDispatch} from "@/core/hooks/use-app-dispatch";
import {baseApi} from "@/core/services/base-api";
import {useCallback} from "react";
import {StorageService} from "@/core/stores/storage-service";
import {TOKENS} from "@/core/constants/local-storage";

export const useLogout = () => {
    const dispatch = useAppDispatch()

    const onLogout = useCallback(() => {
        StorageService.remove(TOKENS)
        dispatch(baseApi.util.resetApiState())
    }, [dispatch]);

    return { onLogout }
}