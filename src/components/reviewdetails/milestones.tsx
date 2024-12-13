interface MilestoneProps {
    number: number;
    title: string;
    hours: number;
    price: number;
    status: 'completed' | 'process' | 'upcoming';
}

const milestones: MilestoneProps[] = [
    {
        number: 1,
        title: "Establish foundational goals",
        hours: 4,
        price: 33,
        status: "completed"
    },
    {
        number: 2,
        title: "Guide the startup",
        hours: 4,
        price: 33,
        status: "process"
    },
    {
        number: 3,
        title: "Analyze completed actions",
        hours: 4,
        price: 33,
        status: "upcoming"
    }
];

const statusStyles = {
    completed: "bg-green-500 text-white",
    process: "bg-blue-400 text-white",
    upcoming: "bg-gray-100 text-gray-700"
};

const statusText = {
    completed: "Completed",
    process: "In Progress",
    upcoming: "Coming Up"
};

export default function Milestones() {
    return (
        <div className="p-6 rounded-[10px] my-6 bg-[#FAFAFA]">
            <h2 className="text-xl font-semibold mb-4">Milestones</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <tbody>
                        {milestones.map((milestone) => (
                            <tr key={milestone.number} className="border-b">
                                <td className="py-2 px-4">{milestone.number}</td>
                                <td className="py-2 px-4 text-[#4A4C56] font-medium">{milestone.title}</td>
                                <td className="py-2 px-4 text-[#4A4C56]">{milestone.hours} Hour</td>
                                <td className="py-2 px-4 text-[#4A4C56]">${milestone.price}</td>
                                <td className="py-2 px-4">
                                    <div className={`px-4 py-1 font-semibold rounded-[5px] text-sm ${statusStyles[milestone.status]}`}>
                                        {statusText[milestone.status]}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
