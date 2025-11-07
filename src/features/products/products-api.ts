import {baseApi} from "@/shared/api/base-api";
import {Product, ProductsArgs, ProductsResponse} from "@/types/product";

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, ProductsArgs>({
            query: ({limit, skip}) => `/products?limit=${limit}&skip=${skip}`
        }),
        getProductById: build.query<Product, number>({
            query: (id) => `/products/${id}`
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery
} = productsApi