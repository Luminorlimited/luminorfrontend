'use client'

import { useState } from 'react'
import { ArrowUpDown, Download, Search } from 'lucide-react'
import { useTransactionListQuery } from '@/redux/Api/paymentApi'
import { toast } from 'sonner'
import Link from 'next/link'
// import Link from 'next/link'



export default function TransactionTable() {
    // const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    // const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSort] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    // const toggleSelectAll = () => {
    //     if (selectedRows.size === transactions.length) {
    //         setSelectedRows(new Set())
    //     } else {
    //         setSelectedRows(new Set(transactions.map(t => t.id)))
    //     }
    // }

    // const toggleRowSelection = (id: string) => {
    //     const newSelected = new Set(selectedRows)
    //     if (newSelected.has(id)) {
    //         newSelected.delete(id)
    //     } else {
    //         newSelected.add(id)
    //     }
    //     setSelectedRows(newSelected)
    // }

    // const filteredTransactions = transactions.filter(transaction =>
    //         transaction.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    //     .sort((a, b) => {
    //         if (!sortBy) return 0
    //         const aValue = a[sortBy as keyof Transaction]
    //         const bValue = b[sortBy as keyof Transaction]
    //         return sortDirection === 'asc'
    //             ? String(aValue).localeCompare(String(bValue))
    //             : String(bValue).localeCompare(String(aValue))
    //     })
    const { data: transactionList } = useTransactionListQuery(undefined)
    console.log('my transaction list ', transactionList);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = transactionList?.data.filter((transaction: any) =>
        transaction.transaction.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSort(column)
            setSortDirection('asc')
        }
    }

    // const offerId = useParams().id


    // console.log('My transaction list', transactionList);


    // console.log('my order', transactionList?.data[3]?.project?.orderAgreementPDF);
    const handleDownloadPdf = () => {
        const pdfUrl = transactionList?.data?.project?.orderAgreementPDF; // Fetch the PDF URL
        if (pdfUrl) {
            const encodedUrl = encodeURI(pdfUrl); // Encode URL to handle special characters
            console.log(encodedUrl); // Log the URL to check if it's correct
            window.open(encodedUrl, '_blank');
        } else {
            toast.error("PDF file not available");
        }
    };



    // const downloadPdf = () => {
    //     // transactionList?.data?.project?.orderAgreementPDF
    // }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div className="relative">
                    <button className="inline-flex items-center px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50">
                        Short by:
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </button>
                </div>
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search By order number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:w-[300px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#F2FAFF]">
                        <tr>

                            {['Date', 'Transaction Number', 'Service Name', 'Order Number', 'Total Amount', 'PDF'].map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                    onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                                >
                                    {header}
                                    {sortBy === header.toLowerCase().replace(' ', '') && (
                                        <ArrowUpDown className="inline ml-2 h-4 w-4" />
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions?.length > 0 ? (
                            filteredTransactions?.map((transaction: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {transaction?.project?.createdAt
                                            ? new Date(transaction?.project?.createdAt).toLocaleDateString()
                                            : "No Date"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {transaction.transaction._id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {transaction?.project?.projectName || "No Service Name"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {transaction.transaction.orderId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        ${transaction.transaction.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        <button
                                            onClick={handleDownloadPdf}
                                            className="hover:bg-gray-100 p-1 rounded-full"
                                        >
                                            {transaction?.project?.orderAgreementPDF ? (
                                                <Link href={transaction?.project?.orderAgreementPDF} download>
                                                    <Download className="h-4 w-4" />
                                                </Link>
                                            ) : (
                                                <span className="text-gray-400">
                                                    <Download className="h-4 w-4" />
                                                </span>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

