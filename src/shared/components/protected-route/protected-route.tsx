import {useMeQuery} from "@/features/auth/auth-api";
import {Navigate, Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const ProtectedRoute = () => {
    const {data: user, isLoading} = useMeQuery();
    console.log(user);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    return user ? <Outlet/> : <Navigate to="auth/login" replace/>
}