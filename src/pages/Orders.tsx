import React, { useEffect } from 'react'
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "order/redux/order.api"
import { toast } from '../services/toast';

const Orders = () => {
    const { data } = useGetOrdersQuery({ fetchAllOrders: true });
    const [updateOrderStatus, { isSuccess, data: updateMessage }] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = (id: string, status: string, returnStatus: string | null) => {
        console.log(returnStatus);
        if (returnStatus) {
            console.log(returnStatus);

            updateOrderStatus({ id, statusData: { status, returnStatus } });
        } else {
            updateOrderStatus({ id, statusData: { status } });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.showSuccess(updateMessage);
        }
    }, [isSuccess, updateMessage]);

    return (
        <div className='md:px-12 lg:px-20'>
            <div className="container p-4 mx-auto my-10">
                <h3 className="text-2xl font-bold mb-6">Orders List</h3>

                <div className="overflow-x-auto">
                    {
                        data?.length === 0
                            ? <div className="text-center text-xl">No Orders Found</div>
                            : <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 border-b text-left text-sm font-semibold text-gray-600">Order ID</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-semibold text-gray-600">Product</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-semibold text-gray-600">Price</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
                                        <th className="px-6 py-4 border-b text-left text-sm font-semibold text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.slice().reverse().map((order: any) => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm">{order._id}</td>
                                            <td className="px-6 py-4">
                                                {order.products.map((item: any) => (
                                                    <div key={item._id} className="my-2">
                                                        <img
                                                            src={item.productId?.image as string}
                                                            alt={item.productId?.name}
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                ${order.products.reduce((total: number, item: any) => total + item.productId.price * item.quantity, 0).toFixed()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-md text-sm font-medium text-white 
                                                ${order.status === "Pending" ? "bg-yellow-500" :
                                                        order.status === "Shipped" ? "bg-blue-600" :
                                                            order.status === "Delivered" ? "bg-teal-600" :
                                                                order.status === "Cancelled" ? "bg-red-600" : "bg-slate-700"}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {order.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(order._id, "Shipped", null)}
                                                        className="text-sm text-blue-500 hover:text-blue-700"
                                                    >
                                                        Mark as Shipped
                                                    </button>
                                                )}
                                                {order.status === "Shipped" && (
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(order._id, "Delivered", null)}
                                                        className="text-sm text-green-500 hover:text-green-700"
                                                    >
                                                        Mark as Delivered
                                                    </button>
                                                )}
                                                {order.status === "Delivered" && order.returnStatus !== null && (
                                                    <button
                                                        onClick={() => handleUpdateOrderStatus(order._id, "Returned", "Completed")}
                                                        className="text-sm text-teal-500 hover:text-teal-700"
                                                    >
                                                        Complete Return
                                                    </button>
                                                )}
                                                {order.status !== "Pending" && order.status !== "Shipped" && order.returnStatus !== "Pending" && (
                                                    <span className='text-sm text-gray-500'>No Action Available</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    );
}

export default Orders
