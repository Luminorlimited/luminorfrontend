"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiTime } from "react-icons/bi";
import Pagination from "@/components/common/pagination/Pagination";
import demoimg from '@/assets/images/demoimg.png';
import projectImgFallback from "@/assets/images/package.png"; // Fallback project image
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
// import { setclientFilter } from "@/redux/ReduxFunction";
import {
  useClientListQuery,
  useLazyClientFilterListQuery,
  useLazyLocationFilterQuery,
  useLazyProfessionalFilterListQuery,
  useProfessionalFilterListQuery,
} from "@/redux/Api/projectApi";
import { RootState } from "@/redux/store";
import { Filters } from "./sidebar";

interface ProjectListProps {
  FilteredData: Filters;
}

const ProjectList: React.FC<ProjectListProps> = ({ FilteredData }) => {
  const sidebarFilters = useSelector((state: RootState) => state.filters);
  const locationFilters = useSelector(
    (state: RootState) => state.locationFilter
  );

  const [fetchLocationData] = useLazyLocationFilterQuery(); // Get location data from API
  const route = usePathname();
  // const dispatch = useDispatch();

  const [clientLazyData] = useLazyClientFilterListQuery();
  const [professionalLazyData] = useLazyProfessionalFilterListQuery();

  const { data: clientData } = useClientListQuery({});
  const { data: professionalData } =
    useProfessionalFilterListQuery(FilteredData);

  const [filteredData, setFilteredData] = useState<any[]>([]); // Ensure it's always an array

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        if (route === "/project-list/client") {
          const response = await clientLazyData(sidebarFilters).unwrap();
          if (Array.isArray(response?.data)) {
            setFilteredData(response.data);
          }
        } else if (
          locationFilters.lat !== undefined &&
          locationFilters.long !== undefined &&
          (locationFilters.max || locationFilters.min)
        ) {
          const response = await fetchLocationData(locationFilters).unwrap();
          if (Array.isArray(response?.data)) {
            setFilteredData([...response.data]);
          }
        } else {
          const response = await professionalLazyData(sidebarFilters).unwrap();
          if (Array.isArray(response?.data)) {
            setFilteredData([...response.data]);
          }
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      }
    };

    fetchFilteredData();

    // No need for a cleanup function here as fetchFilteredData doesn't return any cleanup logic
  }, [route, sidebarFilters, locationFilters]);

  // Ensure correct data is assigned
  const servicesToShow = filteredData;

  const professionalServicesToShow = filteredData;

  // useEffect(() => {
  //   if (
  //     !FilteredData.industry.length &&
  //     !FilteredData.timeline.length &&
  //     !FilteredData.skillType.length
  //   ) {
  //     dispatch(setclientFilter({ industry: [], timeline: [], skillType: [] }));
  //   }
  // }, [FilteredData, dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const data =
    (route === "/project-list/client"
      ? professionalServicesToShow
      : servicesToShow) || []; // Ensure fallback to empty array

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // const test = route === '/project-list/client' ? servicesToShow?.data : professionalServicesToShow?.data
  console.log("My test is", currentItems);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 justify-center mb-8">
        {route === "/project-list/client"
          ? currentItems?.map((data: any, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all"
            >

              <div className="relative w-full">
                <div className="overflow-hidden rounded-[10px]">
                  <Image
                    src={projectImgFallback}
                    alt="Consulting service"
                    width={500}
                    height={218}
                    className="object-cover hover:scale-105 transition-all"
                  />
                </div>

                {/* <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                                    <BiTime className="h-4 w-4" />
                                    <span className="text-xs">{data.availability} days | Duration</span>
                                </div> */}
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <h2>Preference: </h2>
                  <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                    {data?.projectPreference || "Not Specified"}
                  </span>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-15 w-10 overflow-hidden rounded-full">
                      <Image
                        src={data?.profileUrl || demoimg} //demo Image
                        alt={data?.client?.name?.firstName || "Client"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {data.client?.name?.firstName || "Unknown"}{" "}
                      {data.client?.name?.lastName || ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-medium text-gray-900">
                      ★ {data?.averageRating || "0"}
                    </span>
                    <span className="text-[16px] text-gray-500">
                      ({clientData?.data?.length})
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-black">
                  {data.preferedProjects || "Untitled Projects"}
                </h3>

                <div className="flex justify-between">
                  <div className="text-xl">
                    <span className="text-gray-500">Budget: </span>
                    <span className="font-medium text-gray-900">
                      ${data?.budgetRange?.max || "N/A"}
                    </span>
                  </div>

                  <Link
                    className="rounded-[12px]  text-center  px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all   duration-200"
                    href={`/chat/${data?.client?._id}`}
                  >
                    Connect Now
                  </Link>

                  {/* <Button>Connect Now</Button> */}
                </div>
              </div>
            </div>
          ))
          : currentItems?.map((data: any, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-[10px] bg-white shadow-md hover:shadow-lg hover:cursor-pointer transition-all"
            >

              <div className="relative w-full">
                <div className="overflow-hidden rounded-[10px]">
                  <Image
                    src={projectImgFallback}
                    alt="Consulting service"
                    width={500}
                    height={218}
                    className="object-cover hover:scale-105 transition-all"
                  />
                </div>

                <div className="absolute bottom-[-10px] left-5 flex items-center gap-2 rounded-[5px] bg-primary px-2 py-1 text-white">
                  <BiTime className="h-4 w-4" />
                  <span className="text-xs">
                    {data?.projectDurationRange?.max} days | Duration
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <h2>Preferences: </h2>
                  <span className="rounded-[15px] bg-[#74C5FF33] px-3 py-1 text-xs font-normal text-black">
                    {data.projectPreference?.[0] || "Not Specified"}
                  </span>
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-15 w-10 overflow-hidden rounded-full">
                      <Image
                        src={data?.profileUrl || demoimg}
                        alt={data.client?.name?.firstName || "Client"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {data.client?.name?.firstName || "N/A"}{" "}
                      {data.client?.name?.lastName || ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[16px] font-medium text-gray-900">
                      ★ {data?.averageRating || "0"}
                    </span>
                    <span className="text-[16px] text-gray-500">
                      ({professionalData.data.length})
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-black">
                  {data.projectListing || "Untitled Project"}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="text-xl">
                    <span className="text-gray-500">Budget: </span>
                    <span className="font-medium text-gray-900">
                      ${data.budgetRange?.max || "N/A"}
                    </span>
                  </div>
                  <Link
                    className="rounded-[12px]  px-6 py-4 text-[16px] bg-primary font-medium text-white hover:bg-[#4629af] transition-all   duration-200"
                    href={`/chat/${data._id}`}
                  >
                    Connect Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProjectList;
