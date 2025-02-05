"use client";

import StatisticsCard from "@/components/dashboard/StatisticsCard";
import image1 from "@/assets/icons/dashboard/hand-holding-usd.svg";
import image2 from "@/assets/icons/dashboard/shopping-cart.svg";
import image3 from "@/assets/icons/dashboard/truck-side.svg";
import Image from "next/image";
import OrderInsightsCard from "@/components/dashboard/OrderInsightsChart";
import OrderHistoryTable from "@/components/dashboard/OrderHistoryTable";
import { useGetOrderSummaryQuery } from "@/redux/api/orderApi";

const Dashboard = () => {
  const { totalOrder, customizable, nonCustomizable } = useGetOrderSummaryQuery(
    {},
    {
      selectFromResult({ data, isLoading }) {
        const res = data?.data;
        return {
          totalOrder: res?.totalOrders,
          customizable: res?.customizableOrders,
          nonCustomizable: res?.nonCustomizableOrders,
        };
      },
    }
  );

  const statusData = [
    {
      icon: (
        <Image
          src={image1}
          width={20}
          height={20}
          className="w-6 h-6"
          alt="icon"
        />
      ),
      title: "Total Order",
      amount: totalOrder || "0",
    },
    {
      icon: (
        <Image
          src={image2}
          width={20}
          height={20}
          className="w-6 h-6"
          alt="icon"
        />
      ),
      title: "Customizable",
      amount: customizable || "0",
    },
    {
      icon: (
        <Image
          src={image3}
          width={20}
          height={20}
          className="w-6 h-6"
          alt="icon"
        />
      ),
      title: "Non-Customizable",
      amount: nonCustomizable || "0",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {statusData?.map((item) => (
          <StatisticsCard key={item?.title} data={item} />
        ))}
      </div>
      {/* order insights */}
      <div className="mt-6">
        <OrderInsightsCard />
      </div>
      <div className="mt-6">
        <OrderHistoryTable />
      </div>
    </div>
  );
};

export default Dashboard;
