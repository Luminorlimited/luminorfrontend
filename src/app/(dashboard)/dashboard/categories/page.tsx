"use client";
import React from "react";
import imageOne from "@/assets/images/categoryImageOne.png";
import CategoriesCard from "@/components/shared/card/CategoriesCard";
import CategoryModal from "@/components/dashboard/AddCategoryModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import CategorieTable from "@/components/shared/card/CategoryTable";

const CategoryPage = () => {

  const {data: getCategory} = useGetAllCategoriesQuery(null)
  const isOpen = useSelector(
    (state: RootState) => state?.categoryModal?.isOpen
  );

  return (
    <div className="">
      {/* {getCategory?.data?.data.map((card:any, index:number) => ( */}
      <CategorieTable getCategory={getCategory}/>
      {/* ))} */}
      <CategoryModal isOpen={isOpen} />
    </div>
  );
};

export default CategoryPage;


