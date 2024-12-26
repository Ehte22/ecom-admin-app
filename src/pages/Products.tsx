import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAddProductMutation, useDeleteProductMutation, useGetProductQuery, useUpdateProductMutation } from "../redux/apis/product.api";
import Loader from "../components/Loader";
import { toast } from "../services/toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Products: React.FC = () => {
    const { data, isLoading } = useGetProductQuery()
    const [addProduct, { data: addMessage, error: addErrorMessage, isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError }] = useAddProductMutation()
    const [updateProduct, { data: updateMessage, error: updateErrorMessage, isLoading: IsUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateProductMutation()
    const [deleteProduct, { data: deleteMessage, error: deleteErrorMessage, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useDeleteProductMutation()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<string>("")


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const productSchema = z.object({
        name: z.string().min(1, "*Field name is required"),
        price: z
            .string()
            .min(1, "*Field price is required")
            .regex(/^[0-9]+$/, "Only number are allowed"),
        desc: z.string().min(1, "*Field description is required"),
        image: z.union([
            z.instanceof(File, { message: "Image is required" }),
            z.string()
        ])
    })

    type FormValues = z.infer<typeof productSchema>

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<FormValues>({ resolver: zodResolver(productSchema), defaultValues: { desc: "Lorem, ipsum dolor sit amet consectetur adipisicing." } })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            setValue("image", files[0])
        }
    }

    const handleEdit = (id: string) => {
        const product = data?.result.find(item => item._id === id)
        setSelectedProductId(id)

        if (product) {
            setValue("name", product.name);
            setValue("price", product.price);
            setValue("desc", product.desc);
            setValue("image", product.image);
        }
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        deleteProduct(id)
    }

    const onSubmit = (values: FormValues) => {

        const formData = new FormData()

        Object.keys(values).forEach((item) => {
            const key = item as keyof FormValues
            const value = values[key]

            if (key === "image" && value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value.toString());
            }
        })

        if (selectedProductId) {
            updateProduct({ productData: formData, id: selectedProductId })
        } else {
            addProduct(formData)
        }

        reset()
    }

    useEffect(() => {
        if (isAddSuccess) {
            toast.showSuccess(addMessage)
            setIsModalOpen(false)
        }
        if (isUpdateSuccess) {
            toast.showSuccess(updateMessage)
            setIsModalOpen(false)
        }
        if (isDeleteSuccess) {
            toast.showSuccess(deleteMessage)
        }
    }, [isAddSuccess, isUpdateSuccess, isDeleteSuccess])

    useEffect(() => {
        if (isAddError) {
            toast.showError(addErrorMessage as string)
            setIsModalOpen(false)
        }
        if (isUpdateError) {
            toast.showError(updateErrorMessage as string)
            setIsModalOpen(false)
        }
        if (isDeleteError) {
            toast.showError(deleteErrorMessage as string)
        }
    }, [isAddError, isUpdateError, isDeleteError])


    if (isAddLoading || isLoading || IsUpdateLoading || isDeleteLoading) {
        return <Loader />;
    }

    return (
        <div className="md:px-12 lg:px-20">
            <div className="container p-4 mx-auto my-10">
                <div className="text-end">
                    <button
                        onClick={toggleModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Product
                    </button>
                </div>

                <div className="mt-10">
                    <h1 className="text-2xl font-bold mb-6">Product List</h1>

                    {/* Product Listing */}
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b text-left">Image</th>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Price</th>
                                <th className="py-2 px-4 border-b text-left">Description</th>
                                <th className="py-2 px-4 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.result.map((product) => (
                                <tr key={product._id} className="border-b">
                                    <td className="py-2 px-4">
                                        <img
                                            src={product.image as string}  // Ensure the image URL is correct
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </td>

                                    <td className="py-2 px-4">{product.name}</td>
                                    <td className="py-2 px-4">${product.price}</td>
                                    <td className="py-2 px-4">{product.desc}</td>
                                    <td className="py-2 px-4 ">
                                        {/* Edit Button with Icon Only */}
                                        <button
                                            onClick={() => handleEdit(product._id as string)} className="text-teal-600 hover:text-teal-800 focus:outline-none"
                                        >
                                            <FiEdit className="text-xl" />
                                        </button>

                                        {/* Delete Button with Icon Only */}
                                        <button
                                            onClick={() => handleDelete(product._id as string)}
                                            className="text-red-600 ms-5 hover:text-red-800 focus:outline-none"
                                        >
                                            <FiTrash2 className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                    <div className="bg-white rounded-lg sm:w-1/2 lg:w-1/3 p-6">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    {...register("name")}
                                />
                                <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    {...register("price")}
                                />
                                <p className="text-red-600 text-sm mt-1">{errors.price?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    {...register("desc")}
                                />
                                <p className="text-red-600 text-sm mt-1">{errors.desc?.message}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <p className="text-red-600 text-sm mt-1">{errors.image?.message}</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
