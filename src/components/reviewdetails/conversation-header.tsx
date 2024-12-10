import { MessageCircle } from 'lucide-react'

export default function ConversationHeader() {
    return (
        <div className="flex items-center justify-between py-4 my-4 bg-[#FAFAFA] rounded-[10px] px-2">
            <div className="flex items-center gap-2 ">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Your recent inbox conversations with Jane Cooper</span>
            </div>
            <button className="text-primary font-medium">View Chat</button>
        </div>
    )
}

