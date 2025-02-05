import {  User } from "lucide-react";
import Link from "next/link";

export default function DashboardNav() {
    return (
        <div>
            <div className="w-full flex items-center justify-between gap-0 sm:gap-10 bg-[#e9e9e9] text-black lg:px-4 px-20 py-4">
                <div>
                    <h3 className=" text-md md:text-xl font-semibold">Order List</h3>
                </div>
                {/* Actions */}
                <Link href={'/dashboard/profile'} className=" flex items-center gap-2 cursor-pointer hover:bg-[#b8b8b8] rounded-[20px] px-4 py-2 duration-200">
                    <div className=" hover:bg-transparent border p-2 rounded-full">
                        <User className="h-5 sm:h-[22px] w-5 sm:w-[22px] text-gray-600" />
                    </div>
                    <p>Johan</p>
                </Link>
            </div>
        </div>
    );
}