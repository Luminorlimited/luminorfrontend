'use client'

import { useState } from 'react'
import { ArrowUpDown, Download, Search } from 'lucide-react'

interface Transaction {
    id: string
    date: string
    transactionNumber: string
    serviceName: string
    orderNumber: string
    totalAmount: number
}

const transactions: Transaction[] = [
    {
        id: '1',
        date: '23/30/2024',
        transactionNumber: 'FR12445667',
        serviceName: 'Startup Consultant',
        orderNumber: 'FO78638376389373',
        totalAmount: 240,
    },
    {
        id: '2',
        date: '23/30/2024',
        transactionNumber: 'FR12445667',
        serviceName: 'Startup Consultant',
        orderNumber: 'FO78638376389373',
        totalAmount: 240,
    },
    {
        id: '3',
        date: '23/30/2024',
        transactionNumber: 'FR12445667',
        serviceName: 'Startup Consultant',
        orderNumber: 'FO78638376389373',
        totalAmount: 240,
    },
    {
        id: '4',
        date: '23/30/2024',
        transactionNumber: 'FR12445667',
        serviceName: 'Startup Consultant',
        orderNumber: 'FO78638376389373',
        totalAmount: 240,
    },
]

export default function TransactionTable() {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSort] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const toggleSelectAll = () => {
        if (selectedRows.size === transactions.length) {
            setSelectedRows(new Set())
        } else {
            setSelectedRows(new Set(transactions.map(t => t.id)))
        }
    }

    const toggleRowSelection = (id: string) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    const filteredTransactions = transactions
        .filter(transaction =>
            transaction.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (!sortBy) return 0
            const aValue = a[sortBy as keyof Transaction]
            const bValue = b[sortBy as keyof Transaction]
            return sortDirection === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue))
        })

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSort(column)
            setSortDirection('asc')
        }
    }

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
                            <th scope="col" className="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.size === transactions.length}
                                    onChange={toggleSelectAll}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </th>
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
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(transaction.id)}
                                        onChange={() => toggleRowSelection(transaction.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {transaction.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {transaction.transactionNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {transaction.serviceName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {transaction.orderNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    ${transaction.totalAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <button className="hover:bg-gray-100 p-1 rounded-full">
                                        <Download className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

