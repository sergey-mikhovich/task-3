import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import {Header} from "@/shared/components/header/header";

export const Layout = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Box component="main" sx={{flexGrow: 1, bgcolor: 'grey.50'}}>
                <Header/>
                <Outlet/>
            </Box>
        </Box>
    )
}