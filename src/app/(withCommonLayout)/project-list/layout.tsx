import { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-slate-100">
            <div className="container mx-auto">
                <div className='flex items-start gap-5'>
                    <Sidebar />
                    <div className="py-3 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}