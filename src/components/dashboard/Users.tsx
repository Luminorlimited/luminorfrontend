"use client"

import { Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDeleteUserMutation, useGetClientQuery, useGetProfessionalQuery, useUpdateStatusMutation } from "@/redux/Api/dashboard/userapi"
import logo from '@/assets/images/avatar.jpg'
import Image from "next/image"

export default function Users() {
    const { data: getClient, isLoading: clientLoading } = useGetClientQuery(undefined)
    const [updateUserStatus] = useUpdateStatusMutation({})

    const handleStatusChange = async (id: string, status: boolean) => {
        try {
            await updateUserStatus({
                id,
                data: { status },
            }).unwrap()
            // Optionally handle success (e.g., show a toast notification)
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Failed to update status:", error)
        }
    }

    const { data: getProfessional, isLoading: professionalLoading } = useGetProfessionalQuery(undefined)
    console.log("my client is ", getClient);
    console.log("my getProfessional is ", getProfessional);

    const [clients, setClients] = useState(getClient?.data)
    const [professionals, setProfessionals] = useState(getProfessional?.data)

    const [currentPageClients, setCurrentPageClients] = useState(1)
    const [currentPageProfessionals, setCurrentPageProfessionals] = useState(1)
    const itemsPerPage = 5

    useEffect(() => {
        setClients(getClient?.data)
        setProfessionals(getProfessional?.data)
    }, [getClient, getProfessional])

    const paginate = (items: any[], pageNumber: number) => {
        const startIndex = (pageNumber - 1) * itemsPerPage
        return items?.slice(startIndex, startIndex + itemsPerPage)
    }


    const [deleteUser] = useDeleteUserMutation()
    const handleDelete = (id: number) => {
        console.log("my deleted data is ", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    // Ensure deleteUser is called with a valid payload
                    await deleteUser(id).unwrap();
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Something went wrong during deletion.", "error");
                    console.error(error);
                }
            }
        });
    };


    const UserTable = ({
        users,
        userType,
        currentPage,
        isLoading,
    }: { users: any; userType: "client" | "retireProfessional"; currentPage: number; isLoading: boolean }) => (
        <Table>
            <TableHeader className="text-gray-900 text-center">
                <TableRow>
                    <TableHead className="w-[100px]">Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>{userType === "client" ? "Description" : "Bio"}</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Activate User</TableHead>
                    {userType === "retireProfessional" && <TableHead>OnBoarding</TableHead>}
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-black">
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={userType === "client" ? 6 : 7} className="text-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                    </TableRow>
                ) : users?.length > 0 ? (
                    paginate(users, currentPage)?.map((user: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Link className="text-primary hover:underline" href={`/dashboard/users/${user?.client ? user?.client?._id : user?.retireProfessional?._id}`}>
                                    <span className={user?.[userType]?.name?.lastName ? "" : "font-bold"}>
                                        {user?.[userType]?.name?.firstName} {user?.[userType]?.name?.lastName || "Unknown User"}
                                    </span>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Image width={50} height={50} src={user.profileUrl || logo} alt={"my-logo"} className="w-10 h-10 rounded-full" />
                            </TableCell>
                            <TableCell>{user?.[userType === "client" ? "description" : "bio"] || "N/A"}</TableCell>
                            <TableCell>{user?.averageRating || 0}</TableCell>
                            <TableCell>
                                <select
                                    value={user?.client?.isActivated?.toString() || user?.retireProfessional?.isActivated?.toString()  }
                                    onChange={(e) =>
                                        handleStatusChange(user?.client?._id || user?.retireProfessional?._id || "", e.target.value === "true")
                                    }
                                    className={`border rounded p-2 ${user?.client?.isActivated === true || user?.retireProfessional?.isActivated === true ? "text-green-700" : "text-red-700"}`}
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </TableCell>
                            {userType === "retireProfessional" && (
                                <TableCell
                                    className={`font-medium ${user?.retireProfessional?.stripe?.isOnboardingSucess ? "text-green-800" : "text-red-800"}`}
                                >
                                    {user?.retireProfessional?.stripe?.isOnboardingSucess ? "Success" : "Failed"}
                                </TableCell>
                            )}
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                    onClick={() => handleDelete(user?.client?._id || user?.retireProfessional?._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={userType === "client" ? 6 : 7} className="text-center py-4">
                            No User Found..
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )

    return (
        <div className="space-y-8">
            <div className="bg-bg_secondary rounded-[10px] p-4 mb-3">
                <h2 className="text-2xl font-bold mb-4 text-black">Client Users</h2>
                <div className="rounded-md border">
                    <UserTable users={clients} userType="client" currentPage={currentPageClients} isLoading={clientLoading} />
                    <div className="flex justify-between mt-4">
                        <Button
                            className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]"
                            onClick={() => setCurrentPageClients(currentPageClients - 1)}
                            disabled={currentPageClients === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]"
                            onClick={() => setCurrentPageClients(currentPageClients + 1)}
                            disabled={currentPageClients * itemsPerPage >= (clients?.length || 0)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-bg_secondary rounded-[10px] p-4 mb-3">
                <h2 className="text-2xl font-bold mb-4 text-black">Retired Professionals</h2>
                <div className="rounded-md border">
                    <UserTable
                        users={professionals}
                        userType="retireProfessional"
                        currentPage={currentPageProfessionals}
                        isLoading={professionalLoading}
                    />
                    <div className="flex justify-between mt-4">
                        <Button
                            className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]"
                            onClick={() => setCurrentPageProfessionals(currentPageProfessionals - 1)}
                            disabled={currentPageProfessionals === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]"
                            onClick={() => setCurrentPageProfessionals(currentPageProfessionals + 1)}
                            disabled={currentPageProfessionals * itemsPerPage >= (professionals?.length || 0)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

