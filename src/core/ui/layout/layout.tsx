import Box from "@mui/material/Box";
import {PropsWithChildren} from "react";

export const Layout = ({children}: PropsWithChildren) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Box component="main" sx={{flexGrow: 1, bgcolor: 'grey.50'}}>
                {children}
            </Box>
        </Box>
    )
}