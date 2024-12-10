interface MilestoneProps {
    number: number
    title: string
    hours: number
    price: number
    status: 'completed' | 'process' | 'upcoming'
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
]

const statusStyles = {
    completed: "bg-green-500 text-white",
    process: "bg-blue-400 text-white",
    upcoming: "bg-gray-100 text-gray-700"
}

const statusText = {
    completed: "Complited",
    process: "Process",
    upcoming: "Coming up"
}

export default function Milestones() {
    return (
        <div className="p-6 rounded-[10px] my-4 bg-[#FAFAFA] ">
            <h2 className="text-xl font-semibold mb-4">Milestone</h2>
            <div className="space-y-4">
                {milestones.map((milestone) => (
                    <div key={milestone.number} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-700">
                            {milestone.number}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                        </div>
                        <div className="text-right">
                            <div className="text-gray-600">{milestone.hours} Hour</div>
                            <div className="font-medium">${milestone.price}</div>
                        </div>
                        <div className={`px-4 py-1 rounded-[3px] text-sm ${statusStyles[milestone.status]}`}>
                            {statusText[milestone.status]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

