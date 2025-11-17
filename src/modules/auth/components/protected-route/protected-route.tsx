import {Navigate, Outlet} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {routes} from "@/core/constants/routes";
import {useMeQuery} from "@/modules/auth";

export const ProtectedRoute = () => {
    const {data: user, isLoading} = useMeQuery();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return user ? <Outlet/> : <Navigate to={routes.auth.login} replace/>
}