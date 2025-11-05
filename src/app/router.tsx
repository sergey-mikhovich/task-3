import {createBrowserRouter, RouteObject} from "react-router-dom";
import {ProductsList} from "@/features/products/products-list";
import {Product} from "@/features/products/product";
import {App} from "@/app/app";

const publicRoutes: RouteObject[] = [
    // auth routes
]

const privateRoutes: RouteObject[] = [
    {
        path: '/products',
        element: <ProductsList/>,
    },
    {
        path: '/products/:id',
        element: <Product/>
    }
]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            ...privateRoutes
        ]
    }
])