// interface MilestoneProps {
//     number: number;
//     title: string;
//     hours: number;
//     price: number;
//     status: 'completed' | 'process' | 'upcoming';
// }

// const milestones: MilestoneProps[] = [
//     {
//         number: 1,
//         title: "Establish foundational goals",
//         hours: 4,
//         price: 33,
//         status: "completed"
//     },
//     {
//         number: 2,
//         title: "Guide the startup",
//         hours: 4,
//         price: 33,
//         status: "process"
//     },
//     {
//         number: 3,
//         title: "Analyze completed actions",
//         hours: 4,
//         price: 33,
//         status: "upcoming"
//     }
// ];

// const statusStyles = {
//     completed: "bg-green-500 text-white",
//     process: "bg-blue-400 text-white",
//     upcoming: "bg-gray-100 text-gray-700"
// };

// const statusText = {
//     completed: "Completed",
//     process: "In Progress",
//     upcoming: "Coming Up"
// };

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Milestones({
  getSingleOrder,
}: {
  getSingleOrder: any;
}) {
  const getOffer = getSingleOrder?.data?.result?.project;
  // console.log("My offer", getOffer);
  return (
    <div>
      <div className="p-6 rounded-[10px] my-6 bg-[#FAFAFA]">
        <h2 className="text-xl font-semibold mb-4">
          {getOffer?.flatFee
            ? "Flat Fee"
            : getOffer?.hourlyFee
            ? "Hourly Fee"
            : "Milestone"}
        </h2>
        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow className="text-center font-medium">
                <TableHead>Serial</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Revision</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getOffer?.flatFee ? (
                <TableRow className="border-b">
                  <TableCell className="py-2 px-4">1</TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56] font-medium">
                    {getOffer.projectName}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56]">
                    {getOffer.flatFee.revision} Hour
                  </TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56]">
                    ${getOffer.flatFee.price}
                  </TableCell>
                </TableRow>
              ) : getOffer?.hourlyFee ? (
                <TableRow className="border-b">
                  <TableCell className="py-2 px-4">1</TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56] font-medium">
                    {getOffer?.projectName}
                  </TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56]">
                    {getOffer?.hourlyFee?.revision} Hour
                  </TableCell>
                  <TableCell className="py-2 px-4 text-[#4A4C56]">
                    ${getOffer?.hourlyFee?.pricePerHour}
                  </TableCell>
                </TableRow>
              ) : getOffer?.milestones ? (
                getOffer.milestones.map((milestone: any, index: number) => (
                  <TableRow key={milestone._id} className="border-b">
                    <TableCell className="py-2 px-4">{index + 1}</TableCell>
                    <TableCell className="py-2 px-4 text-[#4A4C56] font-medium">
                      {milestone.description}
                    </TableCell>
                    <TableCell className="py-2 px-4 text-[#4A4C56]">
                      {milestone.delivery} Hour
                    </TableCell>
                    <TableCell className="py-2 px-4 text-[#4A4C56]">
                      ${milestone.price}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-2 px-4 text-center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
