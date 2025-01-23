// 'use client'
import { Check, Zap } from 'lucide-react'
import { TiDocumentText } from "react-icons/ti";
import { toast } from 'sonner';


// const timelineItems = [
//     {
//         icon: <TiDocumentText className="w-4 h-4" />,
//         text: "Jane Cooper has placed the order",
//         time: "19 Oct, 16:27"
//     },
//     {
//         icon: <Check className="w-4 h-4" />,
//         text: "Jane Cooper submitted the requirements",
//         time: "19 Oct, 16:35",
//         action: "View Requirements"
//     },
//     {
//         icon: <Zap className="w-4 h-4" />,
//         text: "Order has been started",
//         time: "19 Oct, 17:29"
//     }
// ]



export default function Timeline({ getSingleOrder }: { getSingleOrder: any }) {

    // const mydata = new Date();
    // const formattedDate = new Intl.DateTimeFormat('en-GB', {
    //     day: '2-digit',
    //     month: 'short',
    //     hour: '2-digit',
    //     minute: '2-digit',
    // }).format(mydata);

    const formattedDate = new Date(getSingleOrder?.data?.result?.project?.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    const handleDownloadPdf = () => {
        const pdfUrl = getSingleOrder?.data?.result?.clientRequerment; // Fetch the PDF URL
        if (pdfUrl) {
            // Open the PDF in a new tab
            window.open(pdfUrl, '_blank');
        } else {
            toast.error("PDF file not available");
        }
    };
    return (
        <div className="p-4 bg-[#FAFAFA] rounded-[10px]">
            <div className="text-sm text-center text-gray-500 mb-4">--------- 19 Oct ---------</div>
            <div className="space-y-4 ">
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full text-icon-primary flex items-center justify-center ">
                        <TiDocumentText className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">{getSingleOrder?.data?.retireProfessional[0]?.name.firstName} {getSingleOrder?.data?.retireProfessional[0]?.name.lastName}  has placed the order</span>
                            <span className="text-gray-500 text-sm">{formattedDate}</span>
                        </div>

                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full text-icon-primary flex items-center justify-center ">
                        <Check className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">{getSingleOrder?.data?.retireProfessional[0]?.name.firstName} {getSingleOrder?.data?.retireProfessional[0]?.name.lastName}  submitted the requirement</span>
                            <span className="text-gray-500 text-sm">{formattedDate}</span>
                        </div>
                        {getSingleOrder?.data?.result?.clientRequerment ? (
                            <button
                                className="text-indigo-600 text-sm font-medium mt-1"
                                onClick={handleDownloadPdf}
                            >
                                View Requirement
                            </button>
                        ) : (
                            <span className="text-gray-500 text-sm">Requirement not available</span> // Optional fallback
                        )}


                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full text-icon-primary flex items-center justify-center ">
                        <Zap className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Order has been started</span>
                            <span className="text-gray-500 text-sm">{getSingleOrder?.data?.result?.project?.createdAt}</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

