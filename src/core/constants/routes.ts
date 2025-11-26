export const routes = {
    root: '/',
    auth: {
        root: '/auth',
        login: "/auth/login",
        register: "/auth/register",
        refresh: "/auth/refresh",
    },
    products: {
        list: '/products',
        detail: (id: string = ':id') => `/products/${id}` as const,
    },
    unknown: '*'
} as const;