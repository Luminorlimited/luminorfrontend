"use client"

import { Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
// import Image from "next/image"
// import logo from '@/assets/images/demoimg.png'
import Link from "next/link"
import { useGetClientQuery, useGetProfessionalQuery } from "@/redux/Api/dashboard/userapi"

// Define types for our user data


export default function Users() {
    // Sample data for clients

    const { data: getClient } = useGetClientQuery(undefined)
    const { data: getProfessional } = useGetProfessionalQuery(undefined)

    console.log('my client', getClient);
    console.log('my professional', getProfessional);
    const [clients, setClients] = useState(getClient?.data)

    // Sample data for retired professionals
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
        return items.slice(startIndex, startIndex + itemsPerPage)
    }

    // Handle delete function
    const handleDelete = (userId: number, userType: "client" | "retireProfessional") => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result: any) => {
            if (result.isConfirmed) {
                if (userType === "client") {
                    setClients(clients.filter((client: any) => client.id !== userId))
                } else {
                    setProfessionals(professionals.filter((professional: any) => professional.id !== userId))
                }
                Swal.fire("Deleted!", "User has been deleted.", "success")
            }
        })
    }



    // Table component to avoid repetition
    const ClientUserTable = ({ users, userType }: { users: any; userType: "client" | "retireProfessional" }) => (
        <Table>
            <TableHeader className="text-gray-900  text-center">
                <TableRow>
                    <TableHead className="w-[100px]">Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Rating</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-black">
                {paginate(users, currentPageClients)?.map((user: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            <Link className="hover:text-primary hover:underline" href={`/dashboard/users/${user._id}`}>
                                <span className={user?.client?.name?.lastName ? "" : "font-bold"}>
                                    {user?.client?.name?.firstName} {user?.client?.name?.lastName || "Unknown User"}
                                </span>
                            </Link>
                        </TableCell>

                        <TableCell>
                            {/* <Image width={50} height={50} src={user.profileUrl || logo} alt={"my-logo"} className="w-10 h-10 rounded-full" /> */}
                        </TableCell>
                        <TableCell>{user?.description || "Undefined"}</TableCell>
                        <TableCell>{user?.averageRating || 0}</TableCell>

                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleDelete(user.id, userType)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
    const ProfessionalUserTable = ({ users, userType }: { users: any; userType: "client" | "retireProfessional" }) => (
        <Table>
            <TableHeader className="text-gray-900  text-center">
                <TableRow>
                    <TableHead className="w-[100px]">Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>OnBoarding</TableHead>

                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-black">
                {paginate(users, currentPageProfessionals)?.map((user: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            <Link className="hover:text-primary hover:underline" href={`/dashboard/users/${user._id}`}>
                                <span className={user?.retireProfessional?.name?.lastName ? "" : "font-bold"}>
                                    {user?.retireProfessional?.name?.firstName} {user?.retireProfessional?.name?.lastName || "Unknown User"}
                                </span>
                            </Link>
                        </TableCell>
                        <TableCell>
                            {/* <Image width={50} height={50} src={user.profileUrl || logo} alt={"my-logo"} className="w-10 h-10 rounded-full" /> */}
                        </TableCell>
                        <TableCell>{user?.bio || "Undefined"}</TableCell>
                        <TableCell>{user?.averageRating || 0}</TableCell>
                        <TableCell className={`font-medium ${user?.retireProfessional?.stripe?.isOnboardingSucess ? "text-green-800" : "text-red-800"}`}>
                            {user?.retireProfessional?.stripe?.isOnboardingSucess ? "Success" : "Failed"}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleDelete(user.id, userType)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    return (
        <div className="space-y-8 ">
            <div className="bg-bg_secondary rounded-[10px] p-4 mb-3">
                <h2 className="text-2xl font-bold mb-4 text-black">Client Users</h2>
                <div className="rounded-md border">
                    <ClientUserTable users={clients} userType="client" />
                    <div className="flex justify-between mt-4">
                        <Button className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]" onClick={() => setCurrentPageClients(currentPageClients - 1)} disabled={currentPageClients === 1}>
                            Previous
                        </Button>
                        <Button className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]"  onClick={() => setCurrentPageClients(currentPageClients + 1)} disabled={currentPageClients * itemsPerPage >= clients.length}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-bg_secondary rounded-[10px] p-4 mb-3">
                <h2 className="text-2xl font-bold mb-4 text-black">Retired Professionals</h2>
                <div className="rounded-md border">
                    <ProfessionalUserTable users={professionals} userType="retireProfessional" />
                    <div className="flex justify-between mt-4">
                        <Button className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]" onClick={() => setCurrentPageProfessionals(currentPageProfessionals - 1)} disabled={currentPageProfessionals === 1}>
                            Previous
                        </Button>
                        <Button className="bg-bg_primary rounded-[8px] hover:bg-[#21205fef]" onClick={() => setCurrentPageProfessionals(currentPageProfessionals + 1)} disabled={currentPageProfessionals * itemsPerPage >= professionals.length}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

