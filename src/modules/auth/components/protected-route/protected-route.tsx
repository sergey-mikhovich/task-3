import {useMeQuery} from "@/modules/auth/services/auth-api";
import {Navigate, Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {routes} from "@/core/constants/routes";

export const ProtectedRoute = () => {
    const {data: user, isLoading} = useMeQuery();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return user ? <Outlet/> : <Navigate to={routes.auth.login} replace/>
}