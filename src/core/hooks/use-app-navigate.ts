import {NavigateOptions, useNavigate} from "react-router-dom";
import {routes} from "@/core/constants/routes";

export const useAppNavigate = () => {
    const navigate = useNavigate()

    return {
        back: () => navigate(-1),
        toLogin: (options?: NavigateOptions) => navigate(routes.auth.login, options),
        toProductsList: (options?: NavigateOptions) => navigate(routes.products.list, options),
        toProductDetail: (id: string, options?: NavigateOptions) => navigate(routes.products.detail(id), options),
    }
}