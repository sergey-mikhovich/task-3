import {createBrowserRouter, redirect, RouteObject} from "react-router-dom";
import {ProductsList} from "@/features/products/products-list";
import {Product} from "@/features/products/product";
import {App} from "@/app/app";
import { Login } from "@/features/auth/login";
import {ProtectedRoute} from "@/shared/components/protected-route/protected-route";

const publicRoutes: RouteObject[] = [
    {
      loader: () => redirect('products'),
      index: true
    },
    {
        path: "auth",
        children: [
            {
                path: "login",
                element: <Login/>,
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
    {
        path: 'products',
        children: [
            {
                element: <ProductsList/>,
                index: true
            },
            {
                path: ':id',
                element: <Product/>
            }
        ]
    },
]

export const router = createBrowserRouter([
    {
        path: '/',
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