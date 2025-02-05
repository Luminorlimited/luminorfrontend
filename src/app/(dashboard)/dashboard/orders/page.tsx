import AllOrders from "@/components/dashboard/orders/AllOrders";
import RecentOrder from "@/components/dashboard/orders/RecentOrder";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-5">
      <RecentOrder />
      <AllOrders />
    </div>
  );
}
