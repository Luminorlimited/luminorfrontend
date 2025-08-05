"use client"

import { FaChevronRight, FaAngleLeft } from "react-icons/fa"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

interface PaginationsProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  startIndex: number
  onPageChange: (page: number) => void
}

export default function CustomPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  startIndex,
  onPageChange,
}: PaginationsProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-black text-muted-foreground order-2 sm:order-1">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} users
        </div>
        <Pagination className="order-1 sm:order-2 text-black">
          <PaginationContent>
            <PaginationItem>
              <Button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`px-2 bg-transparent border text-black ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                } hover:text-white hover:bg-primary`}
              >
                <FaAngleLeft />
              </Button>
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1
              // Show current page, first, last, and pages around current
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => onPageChange(page)}
                      className={
                        page === currentPage
                          ? "bg-primary text-white hover:text-white hover:bg-primary/90"
                          : "hover:bg-secondary/20 hover:text-primary"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              // Show ellipsis for gaps
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <span className="px-4">...</span>
                  </PaginationItem>
                )
              }

              return null
            })}

            <PaginationItem>
              <Button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`px-2 bg-transparent border text-black ${
                  currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                } hover:text-white hover:bg-primary`}
              >
                <FaChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
