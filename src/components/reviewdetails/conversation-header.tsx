import { MessageCircleMore } from 'lucide-react';
import Link from 'next/link';

export default function ConversationHeader({ getSingleOrder }: { getSingleOrder: any }) {
    console.log("My single order", getSingleOrder);
    return (
        <div className="flex items-center justify-between py-4 my-4 bg-[#FAFAFA] rounded-[10px] px-2">
            <div className="flex items-center gap-2 ">
                <MessageCircleMore className="w-5 h-5 text-[#74C5FF]" />
                <span className="text-gray-700">Your recent inbox conversations with   {getSingleOrder?.data?.retireProfessional[0]?.name?.firstName} {getSingleOrder?.data?.retireProfessional[0]?.name?.lastName}</span>
            </div>
            <Link href={`/chat/${getSingleOrder?.data?.retireProfessional[0]._id}`} className="text-primary font-medium">View Chat</Link>
        </div>
    )
}

