'use client'
import { ReactNode, useState } from "react";
import { MobileSidebar, Sidebar } from "./Sidebar";
import React from "react";

// import { initializeFilteredData } from "@/redux/api/filterSlice";

export type Filters = {
    industry: string[];
    timeline: string[];
    skillType: string[];
    projectMax: string;
    projectMin: string;
    [key: string]: string[] | string
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
        projectMax: "",
        projectMin: "",
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