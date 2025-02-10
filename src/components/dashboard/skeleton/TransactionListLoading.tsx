import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionListLoading() {


    
    return (
        <Card className="bg-bg_secondary p-6 w-full border-none rounded-[15px]">
            <div>
                <div className="mb-6 flex items-center justify-between p-5">
                    <Skeleton className="h-6 w-40 bg-gray-300 rounded-md" />
                </div>

                <div className="rounded-lg overflow-x-auto min-h-[33vh]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-600 text-sm font-medium text-gray-950">
                                <th className="p-4 text-left">
                                    <Skeleton className="h-4 w-16 bg-gray-300 rounded-md" />
                                </th>
                                <th className="p-4 text-left">
                                    <Skeleton className="h-4 w-16 bg-gray-300 rounded-md" />
                                </th>
                                <th className="p-4 text-left">
                                    <Skeleton className="h-4 w-24 bg-gray-300 rounded-md" />
                                </th>
                                <th className="p-4 text-left">
                                    <Skeleton className="h-4 w-24 bg-gray-300 rounded-md" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="p-4">
                                        <Skeleton className="h-4 w-20 bg-gray-300 rounded-md" />
                                    </td>
                                    <td className="p-4">
                                        <Skeleton className="h-4 w-16 bg-gray-300 rounded-md" />
                                    </td>
                                    <td className="p-4">
                                        <Skeleton className="h-4 w-24 bg-gray-300 rounded-md" />
                                    </td>
                                    <td className="p-4">
                                        <Skeleton className="h-4 w-24 bg-gray-300 rounded-md" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}
