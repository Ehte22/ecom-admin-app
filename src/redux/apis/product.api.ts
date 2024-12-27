import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IProduct } from "../../models/product.interface"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: `${process.env.PRODUCT_URL}/api/v1/product`, credentials: "include", prepareHeaders(headers, { getState }) {
        baseUrl: `https://e-com-product-app-server.vercel.app/api/v1/product`, credentials: "include", prepareHeaders(headers, { getState }) {
            const state = getState() as any
            const token = state.auth.user?.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["product"],
    endpoints: (builder) => {
        return {
            getProduct: builder.query<{ message: string, result: IProduct[] }, void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                transformResponse: (data: { message: string, result: IProduct[] }) => {
                    return data
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                providesTags: ["product"]
            }),

            getProductById: builder.query<IProduct, string>({
                query: (id) => {
                    return {
                        url: `/product/${id}`,
                        method: "GET"
                    }
                },
                transformResponse: (data: { result: IProduct }) => {
                    return data.result
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                providesTags: ["product"]
            }),

            addProduct: builder.mutation<string, FormData>({
                query: productData => {
                    return {
                        url: "/add-product",
                        method: "POST",
                        body: productData
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["product"]
            }),

            updateProduct: builder.mutation<string, { productData: FormData, id: string }>({
                query: ({ productData, id }) => {
                    return {
                        url: `/update-product/${id}`,
                        method: "PUT",
                        body: productData
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["product"]
            }),

            deleteProduct: builder.mutation<string, string>({
                query: (id) => {
                    console.log(id);

                    return {
                        url: `/delete-product/${id}`,
                        method: "DELETE",
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data.message
                },
                invalidatesTags: ["product"]
            }),
        }
    }
})

export const {
    useGetProductQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi
