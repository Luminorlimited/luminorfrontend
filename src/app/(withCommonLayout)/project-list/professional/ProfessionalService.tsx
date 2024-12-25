// ClientService.tsx
'use client';
import { useState } from "react";
import ProjectList from "../ProjectList";
import { MobileSidebar, Sidebar } from "../Sidebar";

export type Filters = {
    industry: string[];
    timeline: string[];
    skillType: string[];
    [key: string]: string[];
};

const ProfessionalService = () => {
    const [filters, setFilters] = useState<Filters>({
        industry: [],
        timeline: [],
        skillType: [],
    });
    // console.log('filters', filters);

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
                        <ProjectList FilteredData={filters} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalService;
