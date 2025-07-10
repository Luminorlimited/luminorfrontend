export default function OrderHeader({ getSingleOrder }: { getSingleOrder: any }) {
  const btnRefunded =  getSingleOrder?.data?.result?.transaction?.paymentStatus === "refunded";
  const btnDisabled = getSingleOrder?.data?.result?.transaction?.paymentStatus === "completed";

    // // console.log('My order details is', getSingleOrder.data.retireProfessional[0].name.firstName);
    return (
        // <div className="bg-indigo-50 p-6 rounded-lg">
        //     <h1 className="text-gray-900 text-xl font-semibold mb-2">
        //         Your order is now in the works
        //     </h1>
        //     <p className="text-gray-600">
        //         Jane Cooper has accept the order. You should complete the order by{' '}
        //         <span className="font-medium">26 Oct 2024, 11:59 AM</span>
        //     </p>
        // </div>



        <div className="rounded-[8px] border-none bg-primary">
            <div className="bg-[#F2FAFF] ml-1 border-none rounded-[8px] p-4">
                <h1 className="text-gray-900 text-xl font-semibold mb-2">
                   {btnDisabled? "Your order is completed": btnRefunded ? "Your order has been refunded": "Your order is now in the works"}
                </h1>
                <p className="text-gray-600">
                    {getSingleOrder?.data?.client?.name?.firstName} {getSingleOrder?.data?.client?.name?.lastName} {
                        btnDisabled? "has complete the order": btnRefunded ?"has refunded the order": "has accept the order. You should complete the order"
                    } 
                    {/* <br />by{' '} */}
                    {/* <span className="font-semibold">{getSingleOrder.data.retireProfessional[0].name.firstName}</span> */}
                </p>
            </div>

        </div>
    )
}

