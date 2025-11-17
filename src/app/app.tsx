import CssBaseline from "@mui/material/CssBaseline";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {useLogout, useMeQuery} from "@/modules/auth";
import {Header, HeaderProps} from "@/core/ui/header/header";
import {useAppNavigate} from "@/core/hooks/use-app-navigate";
import Box from "@mui/material/Box";
import {useCallback, useMemo} from "react";

export const App = () => {
    const {toLogin, toProductsList} = useAppNavigate()
    const {onLogout} = useLogout()
    const {data: user, isLoading} = useMeQuery()

    const onMain = useCallback(() => {
        if (user) {
            toProductsList()
        } else {
            toLogin()
        }
    }, [user])

    const profile: HeaderProps['profile'] = useMemo(() => {
        return user ? {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            image: user.image
        } : undefined
    }, [user])

    return (
        <>
            <CssBaseline/>
            <ScrollRestoration/>
            <Box sx={{minHeight: "100dvh", display: "flex"}}>
                <Header
                    onLogout={onLogout}
                    onMain={onMain}
                    onLogin={toLogin}
                    profile={profile}
                    isLoading={isLoading}/>
                <Box component={"main"} sx={{pt: {xs: 7, sm: 8}, flex: 1}}>
                    <Outlet/>
                </Box>
            </Box>
        </>
    )
}