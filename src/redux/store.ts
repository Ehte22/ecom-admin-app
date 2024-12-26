import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./apis/product.api";
import { userApi } from "./apis/user.api";

const reduxStore = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware, userApi.middleware)
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore