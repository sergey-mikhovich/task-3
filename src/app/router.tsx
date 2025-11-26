import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {App} from "@/app/app";
import {routes} from "@/core/constants/routes";
import {NotFound} from "@/core/ui/not-found/not-found";
import {Login, Register, ProtectedRoute} from "@/modules/auth";
import {Product, ProductsList} from "@/modules/products";

const publicRoutes: RouteObject[] = [
    {
        path: routes.auth.root,
        children: [
            {
                path: routes.auth.login.split("/").pop(),
                element: <Login/>,
            },
            {
                path: routes.auth.register.split("/").pop(),
                element: <Register/>
            }
        ]
    },
    {
        path: routes.unknown,
        element: <NotFound/>
    }
]

const privateRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={routes.products.list} replace/>
    },
    {
        path: routes.products.list,
        children: [
            {
                element: <ProductsList/>,
                index: true
            },
            {
                path: routes.products.detail().split("/").pop(),
                element: <Product/>
            }
        ]
    },
]

export const router = createBrowserRouter([
    {
        path: routes.root,
        element: <App/>,
        children: [
            {
                element: <ProtectedRoute/>,
                children: privateRoutes
            },
            ...publicRoutes
        ]
    }
])