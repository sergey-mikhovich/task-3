import {NavigateOptions, useNavigate} from "react-router-dom";
import {routes} from "@/core/constants/routes";
import {useCallback} from "react";

export const useAppNavigate = () => {
    const navigate = useNavigate()

    const back = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const toLogin = useCallback((options?: NavigateOptions) => {
        navigate(routes.auth.login, options)
    }, [navigate])

    const toRegister = useCallback((options?: NavigateOptions) => {
        navigate(routes.auth.register, options)
    }, [navigate])

    const toProductsList = useCallback((options?: NavigateOptions) => {
        navigate(routes.products.list, options)
    }, [navigate])

    const toProductDetail = useCallback((id: string, options?: NavigateOptions) => {
        navigate(routes.products.detail(id), options)
    }, [navigate])

    return {back, toLogin, toRegister, toProductsList, toProductDetail}
}