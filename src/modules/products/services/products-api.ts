import {baseApi} from "@/core/services/base-api";
import {Product, ProductsArgs, ProductsResponse} from "@/modules/products/models/product";

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