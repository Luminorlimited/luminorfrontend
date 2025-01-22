export default function OrderHeader({ getSingleOrder }: { getSingleOrder: any}) {

    // console.log('My order details is', getSingleOrder.data.retireProfessional[0].name.firstName);
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
                    Your order is now in the works
                </h1>
                <p className="text-gray-600">
                    {getSingleOrder?.data?.retireProfessional[0]?.name?.firstName} {getSingleOrder?.data?.retireProfessional[0]?.name?.lastName} has accept the order. You should complete the order
                    {/* <br />by{' '} */}
                    {/* <span className="font-semibold">{getSingleOrder.data.retireProfessional[0].name.firstName}</span> */}
                </p>
            </div>

        </div>
    )
}

