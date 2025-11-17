import {Product} from "@/modules/products/models/product";
import {useCallback} from "react";
import {useGetProductsQuery} from "@/modules/products";
import {useSearchParams} from "react-router-dom";

type UsePaginationProps = {
    limit?: number
}

type UsePaginationResult = {
    page: number
    totalPages: number
    products: Product[]
    isLoading: boolean
    isFetching: boolean
    error: unknown
    goToPage: (page: number) => void
    nextPage: () => void
    previousPage: () => void
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export const useProductsPagination = ({
    limit = 9
}: UsePaginationProps = {}): UsePaginationResult => {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    const page = urlPage > 0 ? urlPage : 1;

    const skip = (page - 1) * limit;

    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useGetProductsQuery({ limit, skip });

    const total = data?.total ?? 0;
    const products = data?.products ?? [];

    const totalPages = Math.ceil(total / limit);

    const goToPage = useCallback((newPage: number) => {
        if (newPage < 1) return;
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(newPage));
            return next;
        }, { replace: true });
    }, [setSearchParams]);

    const nextPage = useCallback(() => {
        goToPage(page + 1);
    }, [goToPage, page]);

    const previousPage = useCallback(() => {
        goToPage(page - 1);
    }, [goToPage, page]);

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        page,
        totalPages,
        products,
        isLoading,
        isFetching,
        error,
        goToPage,
        nextPage,
        previousPage,
        hasNextPage,
        hasPreviousPage
    };
};