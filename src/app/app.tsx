import CssBaseline from "@mui/material/CssBaseline";
import {Outlet} from "react-router-dom";
import {useLogout, useMeQuery} from "@/modules/auth";
import {Header, HeaderProps} from "@/core/ui/header/header";
import {Layout} from "@/core/ui/layout/layout";
import {useAppNavigate} from "@/core/hooks/use-app-navigate";

export const App = () => {
    const {toLogin, toProductsList} = useAppNavigate()
    const {onLogout} = useLogout()
    const {data: user, isLoading} = useMeQuery()

    const onMain = () => {
        if (user) {
            toProductsList()
        } else {
            toLogin()
        }
    }

    const profile: HeaderProps['profile'] = user ? {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        image: user.image
    } : undefined

    return (
        <>
            <CssBaseline/>
            <Layout>
                <Header
                    onLogout={onLogout}
                    onMain={onMain}
                    onLogin={toLogin}
                    profile={profile}
                    isLoading={isLoading}/>
                <Outlet/>
            </Layout>
        </>
    )
}