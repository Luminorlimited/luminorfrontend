"use client";

import { Button } from "@/components/ui/button";
import { Edit, Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/productApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AllProducts() {
  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  // console.log(page, limit);
  // GET DATA
  const { data, isLoading } = useGetAllProductsQuery({ limit, page });
  // console.log(data?.data);
  // DELETE PRODUCTS API
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  // USE STATES
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setProducts(data?.data?.result);
    }
  }, [data, page, limit]);

  const handleEdit = (id: string) => {
    // console.log(id);
    router.push(`/dashboard/products/${id}`);
  };
  const handleDelete = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteProduct(id);
      // console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1d1d1d] rounded-lg min-h-[80vh] flex flex-col justify-between gap-5">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-transparent font-bold">
            <TableHead className="text-gray-400 font-bold">
              Product Name
            </TableHead>
            <TableHead className="text-gray-400 font-bold">Price</TableHead>
            <TableHead className="text-gray-400 font-bold">Discount</TableHead>

            <TableHead className="text-gray-400 font-bold">
              Categories ID
            </TableHead>
            <TableHead className="text-gray-400 font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <Loader />
          ) : (
            products.map((order: any) => (
              <TableRow
                key={order?.id}
                className="border-gray-800 hover:bg-gray-800/50"
              >
                <TableCell className="font-medium text-white">
                  <div className="flex items-center gap-3">
                    <Image
                      src={order?.images[0] || "/placeholder.svg"}
                      alt={order?.productName}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <span>{order?.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">{order?.price}</TableCell>
                <TableCell className="text-gray-400">
                  {order?.discount}
                </TableCell>
                <TableCell>{order?.categoryId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button onClick={() => handleEdit(order?.id)}>
                      <Edit />
                    </Button>
                    <Button
                      onClick={() => handleDelete(order?.id)}
                      className="text-red-600"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* pagination */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => prev - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(Math.ceil(data?.data?.meta?.total / limit))].map(
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className="bg-[#1d1d1d] text-gray-400 hover:bg-bg_primary hover:text-white border-bg_primary"
                    onClick={() => setPage(index + 1)}
                    isActive={page === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((prev) => Math.min(prev + 1))}
                className={
                  page === Math.ceil(data?.data?.meta?.total / limit)
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
