import { Check, MessageSquare, Zap } from 'lucide-react'

const timelineItems = [
    {
        icon: <MessageSquare className="w-4 h-4" />,
        text: "Jane Cooper has placed the order",
        time: "19 Oct, 16:27"
    },
    {
        icon: <Check className="w-4 h-4" />,
        text: "Jane Cooper submitted the requirements",
        time: "19 Oct, 16:35",
        action: "View Requirements"
    },
    {
        icon: <Zap className="w-4 h-4" />,
        text: "Order has been started",
        time: "19 Oct, 17:29"
    }
]

export default function Timeline() {
    return (
        <div className="p-4 bg-[#FAFAFA] rounded-[10px]">
            <div className="text-sm text-center text-gray-500 mb-4">--------- 19 Oct ---------</div>
            <div className="space-y-4 ">
                {timelineItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full text-icon-primary flex items-center justify-center ">
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">{item.text}</span>
                                <span className="text-gray-500 text-sm">{item.time}</span>
                            </div>
                            {item.action && (
                                <button className="text-indigo-600 text-sm font-medium mt-1">
                                    {item.action}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

