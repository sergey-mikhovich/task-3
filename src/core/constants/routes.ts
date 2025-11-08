export const routes = {
    root: '/',
    auth: {
        root: '/auth',
        login: "/auth/login",
    },
    products: {
        list: '/products',
        detail: (id: string = ':id') => `/products/${id}` as const,
    },
} as const;