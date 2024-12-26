import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IUser } from "../../models/user.interface"

export const userApi = createApi({
    reducerPath: "userApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${process.env.USER_URL}/api/v1/auth`, credentials: "include" }),
    baseQuery: fetchBaseQuery({ baseUrl: `https://auth-app-one-nu.vercel.app/api/v1/auth`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query<IUser[], void>({
                query: () => {
                    return {
                        url: "/get-users",
                        method: "GET",
                    }
                },
                transformResponse: (data: { message: string, result: IUser[] }) => {
                    return data.result
                }
            }),
        }
    }
})

export const { useGetUsersQuery } = userApi
