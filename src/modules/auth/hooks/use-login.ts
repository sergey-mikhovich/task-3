import {useLazyMeQuery, useLoginMutation} from "@/modules/auth/services/auth-api";
import {LoginArgs} from "@/modules/auth/models/auth";
import {useAppNavigate} from "@/core/hooks/use-app-navigate";

export const useLogin = () => {
    const {toProductsList} = useAppNavigate();
    const [login, {isLoading, error}] = useLoginMutation();
    const [fetchMe] = useLazyMeQuery()

    const onLogin = async ({username, password}: LoginArgs) => {
        const result = await login({ username, password }).unwrap();
        localStorage.setItem("accessToken", result.accessToken);
        await fetchMe().unwrap();
        toProductsList({replace: true});
    }

    return { onLogin, isLoading, error };
}