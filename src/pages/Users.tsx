import React from 'react'
import { useGetUsersQuery } from '../redux/apis/user.api'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Loader from '../components/Loader';

const Users = () => {
    const { data, isLoading } = useGetUsersQuery()

    if (isLoading) {
        return <Loader  />
    }
    return <>
        <div className=" md:px-12 lg:px-20">
            <div className="container mx-auto px-4 my-10">
                <h1 className="text-2xl font-bold mb-6">User List</h1>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">Profile</th>
                                <th className="py-2 px-4 text-left">Name</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Phone</th>
                                <th className="py-2 px-4 text-left">Role</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-100">
                                    {/* Profile */}
                                    <td className="py-2 px-4">
                                        <img
                                            src={user.profile
                                                ? user.profile as string
                                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                            alt={`${user.name}'s profile`}
                                            className="w-12 h-12 object-cover rounded-full border"
                                        />
                                    </td>

                                    {/* Name */}
                                    <td className="py-2 px-4">{user.name}</td>

                                    {/* Email */}
                                    <td className="py-2 px-4">{user.email}</td>

                                    {/* Phone */}
                                    <td className="py-2 px-4">{user.phone}</td>

                                    {/* Role */}
                                    <td className="py-2 px-4">{user.role}</td>

                                    {/* Actions */}
                                    <td className="py-2 px-4">
                                        <button
                                            // onClick={() => handleEdit(user.id)}
                                            className="text-teal-700 hover:text-teal-900"
                                        >
                                            <FiEdit className="text-xl" />
                                        </button>
                                        <button
                                            // onClick={() => handleDelete(user.id)}
                                            className="text-red-700 ms-4 hover:text-red-900"
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
        </div>
    </>
}

export default Users