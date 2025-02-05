"use client"

import { Trash2 } from "lucide-react"
import { useState } from "react"
import Swal from "sweetalert2"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Define types for our user data
interface User {
    id: number
    name: string
    image: string
    rating: number
    bio: string
}

export default function Users() {
    // Sample data for clients
    const [clients, setClients] = useState<User[]>([
        {
            id: 1,
            name: "John Doe",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "Regular customer since 2022",
        },
        {
            id: 2,
            name: "Sarah Smith",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "Frequent buyer of premium products",
        },
        {
            id: 3,
            name: "Mike Johnson",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "New customer with high engagement",
        },
    ])

    // Sample data for retired professionals
    const [professionals, setProfessionals] = useState<User[]>([
        {
            id: 1,
            name: "Dr. Robert Wilson",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "Retired Cardiologist with 30 years experience",
        },
        {
            id: 2,
            name: "Prof. Emily Brown",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "Former University Professor in Economics",
        },
        {
            id: 3,
            name: "Arch. James Miller",
            rating: 4,
            image: "/placeholder.svg?height=40&width=40",
            bio: "Retired Architect specializing in sustainable design",
        },
    ])

    // Handle delete function
    const handleDelete = (userId: number, userType: "client" | "professional") => {
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
                    setClients(clients.filter((client) => client.id !== userId))
                } else {
                    setProfessionals(professionals.filter((professional) => professional.id !== userId))
                }
                Swal.fire("Deleted!", "User has been deleted.", "success")
            }
        })
    }

    // Table component to avoid repetition
    const UserTable = ({ users, userType }: { users: User[]; userType: "client" | "professional" }) => (
        <Table>
            <TableHeader className="text-gray-900  text-center">
                <TableRow>
                    <TableHead className="w-[100px]">Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Bio</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-black">
                {users.map((user, index) => (
                    <TableRow key={user.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                            <Image width={50} height={50} src={user.image || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
                        </TableCell>
                        <TableCell>{user.bio}</TableCell>
                        <TableCell>{user.rating}</TableCell>
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
                    <UserTable users={clients} userType="client" />
                </div>
            </div>

            <div className="bg-bg_secondary rounded-[10px] p-4 mb-3">
                <h2 className="text-2xl font-bold mb-4 text-black">Retired Professionals</h2>
                <div className="rounded-md border">
                    <UserTable users={professionals} userType="professional" />
                </div>
            </div>
        </div>
    )
}

