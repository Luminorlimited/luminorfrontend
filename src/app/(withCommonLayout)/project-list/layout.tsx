import { ReactNode } from "react";
import Sidebar from "./sidebar";

export default function layout( { children }: { children: ReactNode }) {
    return (
        <div className='flex items-start gap-5'>
            <Sidebar/>
            {children}
        </div>
    );
}