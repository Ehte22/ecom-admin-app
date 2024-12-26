import React, { useState } from "react";
import { FiSearch, FiMenu, FiX, FiPower } from "react-icons/fi"; // Import necessary icons
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSignOut = () => { }

    return <>
        {/* Navbar */}
        <nav className="bg-teal-700 md:px-12 lg:px-20">
            <div className="container p-4 mx-auto flex items-center justify-between">
                <div className="flex items-center gap-20">
                    {/* Logo */}
                    <div className="text-white text-xl font-bold">
                        <Link to="/admin">E-Commerce Admin</Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex space-x-4">
                        <Link to="/admin" className="text-white hover:text-gray-200">
                            Home
                        </Link>
                        <Link to="/admin/products" className="text-white hover:text-gray-200">
                            Products
                        </Link>
                        <Link to="/admin/users" className="text-white hover:text-gray-200">
                            Users
                        </Link>
                        <Link to="/admin/orders" className="text-white hover:text-gray-200">
                            Orders
                        </Link>
                    </div>
                </div>

                {/* User Profile, Cart, and Search */}
                <div className="flex items-center space-x-6">
                    {/* Search Icon for Small Screens */}
                    <button
                        className="text-white text-2xl md:hidden focus:outline-none"
                        onClick={toggleSearch}
                        aria-label="Search"
                    >
                        <FiSearch />
                    </button>

                    {/* Search Bar for Medium+ Screens */}
                    <div className="relative hidden md:flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 px-4 py-2 rounded-sm focus:outline-none"
                        />
                        <FiSearch
                            className="absolute right-3 text-teal-600 text-xl cursor-pointer"
                            aria-label="Search"
                        />
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleSignOut}
                        className="text-white text-2xl focus:outline-none hover:text-gray-300"
                        aria-label="Logout"
                    >
                        <FiPower />
                    </button>

                    {/* Menu Button for Small Screens */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="text-white text-2xl focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <FiMenu />
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
            <div
                onClick={toggleSidebar}
                className="fixed inset-0 bg-black opacity-50 z-40"
            ></div>
        )}

        {/* Search Modal for Small Screens */}
        {isSearchOpen && (
            <div className="fixed top-14 left-0 w-full bg-teal-700 p-4 z-10 shadow-lg">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white px-4 py-2 text-black rounded-sm focus:outline-none"
                    />
                    <button
                        className="ml-4 text-white text-2xl focus:outline-none"
                        onClick={toggleSearch}
                    >
                        <FiX />
                    </button>
                </div>
            </div>
        )}

    </>

};

export default Navbar;
