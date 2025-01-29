'use client'
import { ReactNode,  useState } from "react";
// import { MobileSidebar, Sidebar } from "@/app/(withCommonLayout)/project-list/Sidebar";
import React from "react";
import { MobileSidebar, Sidebar } from "./sidebar";


export type Filters = {
    industry: string[];
    timeline: string[];
    skillType: string[];
    [key:string]: string[];
};
export default function FilteredComponent({ children }: { children: ReactNode }) {

    // const dispatch = useDispatch();

    // const filteredData = useSelector((state: RootState) => state.filter.filteredData);

    // useEffect(() => {
    //     dispatch(initializeFilteredData());
    // }, [dispatch]);
    const [filters, setFilters] = useState<Filters>({
        industry: [],
        timeline: [],
        skillType: [],
    });
    console.log(filters);
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-5">
                    <div className="lg:hidden w-full">
                        <MobileSidebar setFilters={setFilters} />
                    </div>
                    <div className="hidden lg:block">
                        <Sidebar setFilters={setFilters} />
                    </div>
                    <div className="py-3 w-full">
                        {children && React.cloneElement(children as React.ReactElement)}
                    </div>
                </div>
            </div>
        </div>
    );
}