import { FileText } from 'lucide-react'
import OrderCard from './OrderCard'
import { toast } from 'sonner';

export default function OrderDetails({ getSingleOrder }: { getSingleOrder: any }) {
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
        <div className="max-w-[550px] ">
            <OrderCard getSingleOrder={getSingleOrder} />

            <div className='mt-6  bg-[#FAFAFA] lg:p-6 md:p-6 p-2'>
                <div className="space-y-1">
                    <h1 className="text-2xl text-gray-900">
                        Project Details
                    </h1>

                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            {getSingleOrder?.data?.result?.project?.projectName}
                        </h2>
                        {/* <p className="text-sm text-gray-600">
                            Business consultancy and management
                        </p> */}
                    </div>
                    <hr />
                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            Description 
                        </h2>
                        <p className="text-sm text-gray-600">
                            {getSingleOrder?.data?.result?.project?.description}
                          
                        </p>
                    </div>
                    <hr />
                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            Client Requirements
                        </h2>
                        <p className="text-sm text-gray-600">
                            Download Review requirements in PDF
                        </p>
                    </div>


                    <div className="space-y-4">

                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-[#5558E1] text-white rounded-xl transition-colors" onClick={handleDownloadPdf}>
                            <FileText className="w-6 h-6" />
                            <span className="text-xl">Download PDF</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

