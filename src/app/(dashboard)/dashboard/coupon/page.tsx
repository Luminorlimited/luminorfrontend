"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import CouponModal from "@/components/dashboard/AddCouponModal";
import CouponTable from "@/components/shared/card/CouponTable";
import { useGetAllCouponQuery } from "@/redux/api/couponApi";

const CouponPage = () => {

    const { data: getCoupon } = useGetAllCouponQuery(undefined)
    const isOpen = useSelector(
        (state: RootState) => state?.couponModal?.isOpen
    );

    return (
        <div className="">
            {/* {getCategory?.data?.data.map((card:any, index:number) => ( */}
            <CouponTable getCoupon={getCoupon} />
            {/* ))} */}
            <CouponModal isOpen={isOpen} />
        </div>
    );
};

export default CouponPage;


