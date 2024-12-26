import React from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ISidebarProps {
    isSidebarOpen: boolean,
    toggleSidebar: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-64 h-full bg-gray-100 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-4">
                <h2 className="text-xl text-black font-bold">Menu</h2>
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 right-4 text-black text-2xl focus:outline-none"
                >
                    <FiX />
                </button>
            </div>
            <nav className="mt-8 space-y-4">
                <Link
                    to="/admin"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin/products"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Products
                </Link>
                <Link
                    to="/admin/users"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Users
                </Link>
                <Link
                    to="/admin/orders"
                    className="block px-4 py-2 text-black hover:bg-teal-600 hover:text-white rounded"
                    onClick={toggleSidebar}
                >
                    Orders
                </Link>
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-4 w-full px-4">
                <button
                    className="w-full bg-gray-700 text-white py-2 rounded hover:bg-red-700 transition"
                >
                    Sign Out
                </button>
            </div>

        </div>
    );
};

export default Sidebar;
