import { FileText } from 'lucide-react'
import OrderCard from './OrderCard'

export default function OrderDetails() {
    return (
        <div className="max-w-[550px] ">
           <OrderCard/>

            <div className='mt-6  bg-[#FAFAFA] p-6'>
                <div className="space-y-1">
                    <h1 className="text-2xl text-gray-900">
                        Project Details
                    </h1>

                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            Project Name
                        </h2>
                        <p className="text-sm text-gray-600">
                            Business consultancy and management
                        </p>
                    </div>
                    <hr/>
                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            Description
                        </h2>
                        <p className="text-sm text-gray-600">
                            We offer expert business consultancy and management services, guiding your company toward sustainable growth, improved efficiency, and strategic solutions tailored to meet evolving market demands.
                        </p>
                    </div>
                    <hr/>
                    {/* Project Name Section */}
                    <div className="space-y-2 p-4">
                        <h2 className="text-lg  text-gray-900">
                            Client Requirements
                        </h2>
                        <p className="text-sm text-gray-600">
                            Download Review requirements in PDF 
                        </p>
                    </div>

                   
                    {/* Client Requirements Section */}
                    <div className="space-y-4">
                       
                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-[#5558E1] text-white rounded-xl transition-colors">
                            <FileText className="w-6 h-6" />
                            <span className="text-xl">Download PDF</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

