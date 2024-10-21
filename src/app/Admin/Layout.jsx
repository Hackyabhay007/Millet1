// src/app/Admin/Layout.jsx

import React from 'react';
import Sidebar from '@/app/Sidebar/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex font-afacadFlux h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-200">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
