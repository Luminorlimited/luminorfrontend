import PaymentStatusCard from "@/components/dashboard/PaymentStatusCard";
import Image from "next/image";
import image1 from "@/assets/icons/dashboard/arrowUp.svg";
import PayementBarChart from "@/components/dashboard/PaymentBarChart";
import PaymentPieChart from "@/components/dashboard/PaymentPieChart";
import PaymentHistoryTable from "@/components/dashboard/paymentHistoryTable";

const DashboardPaymentPage = () => {
  const data = [
    {
      icon: (
        <Image
          src={image1}
          width={20}
          height={20}
          className="w-4 h-4"
          alt="icon"
        />
      ),
      amount: 128.0,
      title: "Last Transaction",
      comments: "Last 24 hour transaction",
    },
    {
      icon: (
        <Image
          src={image1}
          width={20}
          height={20}
          className="w-4 h-4"
          alt="icon"
        />
      ),
      amount: 128.0,
      title: "Total Revenue",
      comments: "8.3% more then last month",
    },
    {
      icon: (
        <Image
          src={image1}
          width={20}
          height={20}
          className="w-4 h-4"
          alt="icon"
        />
      ),
      amount: 128.0,
      title: "Total Refund",
      comments: "8.3% less then last month",
    },
  ];
  return (
    <div>
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data?.map((item) => (
          <PaymentStatusCard key={item?.title} data={item} />
        ))}
      </div>
      {/* charts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <PayementBarChart />
        </div>
        <div>
          <PaymentPieChart />
        </div>
      </div>

      {/* table */}
      <div className="mt-6">
        <PaymentHistoryTable />{" "}
      </div>
    </div>
  );
};

export default DashboardPaymentPage;
