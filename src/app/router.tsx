import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import {App} from "@/app/app";
import {Login, ProtectedRoute} from "@/modules/auth";
import {Product, ProductsList} from "@/modules/products";
import {routes} from "@/core/constants/routes";

const publicRoutes: RouteObject[] = [
    {
        index: true,
        element: <Navigate to={routes.products.list}/>
    },
    {
        path: routes.auth.root,
        children: [
            {
                path: routes.auth.login.split("/").pop(),
                element: <Login/>,
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
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