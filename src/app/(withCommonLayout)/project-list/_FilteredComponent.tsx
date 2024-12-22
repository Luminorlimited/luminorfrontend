'use client'
import { ReactNode } from "react";
import { MobileSidebar, Sidebar } from "./Sidebar";

export default function FilteredComponent({ children }: { children: ReactNode }) {
    
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-5">
                    <div className="lg:hidden w-full">
                        <MobileSidebar />
                    </div>
                    <div className="hidden lg:block">
                        <Sidebar />
                    </div>
                    <div className="py-3 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}