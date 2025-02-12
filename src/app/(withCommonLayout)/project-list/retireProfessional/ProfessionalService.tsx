// ClientService.tsx
"use client";
import { useState } from "react";
import ProjectList from "../ProjectList";
import { Filters, MobileSidebar, Sidebar } from "../sidebar";
// import { MobileSidebar, Sidebar } from '@/app/(withCommonLayout)/project-list/Sidebar';

const ClientService = () => {
  const [filters, setFilters] = useState<Filters>({
    industry: undefined,
    timeline: undefined,
    skillType: undefined,
    projectMin: undefined,
    projectMax: undefined,
    minBudget: undefined,
    maxBudget: undefined,
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
            <ProjectList FilteredData={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientService;
