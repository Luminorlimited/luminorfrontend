"use client"

import dynamic from "next/dynamic";
const AdminLogin = dynamic(() => import("@/components/dashboard/AdminLogin"), { ssr: false });

export default function Page() {
    return (
        <div>
            <AdminLogin />
        </div>
    );
}