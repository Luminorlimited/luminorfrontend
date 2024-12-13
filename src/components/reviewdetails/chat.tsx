import Image, { StaticImageData } from 'next/image';
import { Paperclip, Send, Smile } from 'lucide-react';
import demoprofile from '@/assets/images/demoimg.png';
import { IoVideocamOutline } from 'react-icons/io5';
import offer from '@/assets/images/offer.png'

interface Message {
    sender: string;
    avatar: string | StaticImageData;
    message: string;
    time: string;
    isSender: boolean; // New property to differentiate sender and receiver
    attachments?: {
        name: string;
        size: string;
        preview: string | StaticImageData;
    }[];
}

const messages: Message[] = [
    {
        sender: 'Jane Cooper',
        avatar: demoprofile,
        message: "Hello, I've placed the order.",
        time: '09:40',
        isSender: false,
        attachments: [ // Corrected to an array of objects
            {
                name: "img",
                size: '12mb',
                preview: offer 
            }
        ]
    },
    {
        sender: 'John Watson',
        avatar: demoprofile,
        message: 'Thank you for your order. I have started reviewing your project.',
        time: '09:42',
        isSender: true,
        attachments: [ // Corrected to an array of objects
            {
                name: "img",
                size: '12mb',
                preview: offer
            }
        ]
    },
    {
        sender: 'Jane Cooper',
        avatar: demoprofile,
        message: "Let me know if you need anything else!",
        time: '09:45',
        isSender: false,
    },
    {
        sender: 'John Watson',
        avatar: demoprofile,
        message: 'Thank you for the document.',
        time: '09:50',
        isSender: true,
    },
];

export default function Chat() {
    return (
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm rounded-b-[18px] max-w-lg mx-auto md:max-w-3xl">
            {/* Header */}
            <div className="p-4 bg-[#74C5FF] rounded-t-[15px]">
                <div className="flex items-center gap-3">
                    <Image
                        src={demoprofile}
                        alt="Jane Cooper"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium text-white">Jane Cooper Accepted the Offer</div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-6 overflow-y-auto max-h-[400px]">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isSender ? "justify-end" : "justify-start"} mb-4`}
                    >
                        <div
                            className={`flex items-start max-w-[70%] ${message.isSender ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Avatar */}
                            <div>
                                <Image
                                    src={message.avatar}
                                    alt={message.sender}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className={`mx-2 ${message.isSender ? "text-right" : "text-left"}`}>
                                <div
                                    className={`p-3 rounded-lg inline-block ${message.isSender ? 'bg-primary text-white rounded-l-[10px] rounded-b-[10px]' : 'bg-gray-100 text-gray-700 rounded-r-[10px] rounded-b-[10px]'}`}
                                >
                                    {message.message}
                                </div>
                                {
                                    message.attachments && message.attachments.length > 0 && (
                                        <div
                                            className={`flex py-2 ${message.isSender ? "justify-end" : "justify-start"}`}
                                        >
                                            {/* <a
                                                href={message.attachments[0].preview}
                                                download="attachment.jpg"
                                            > */}
                                                <Image
                                                    src={message.attachments[0].preview}
                                                    width={200}
                                                    height={117}
                                                    alt="attachment"
                                                />
                                            {/* </a> */}
                                        </div>
                                    )
                                }

                                <div className="text-xs text-muted-foreground mt-1">
                                    {message.time}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="p-4 border-t flex items-center gap-3 bg-white sticky bottom-0">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <input
                    type="text"
                    placeholder="Write message here..."
                    className="flex-1 bg-transparent focus:outline-none text-gray-700 bg-white rounded-[18px] py-2 px-3 border border-gray-300 rounded-["
                />
                <button className="p-2 bg-white rounded-full">
                    <Smile className="w-5 h-5 text-black" />
                </button>
                <button className="p-2 bg-white rounded-full">
                    <IoVideocamOutline className="w-5 h-5 text-black" />
                </button>
                <button className="p-2 bg-primary rounded-full hover:bg-indigo-700">
                    <Send className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
}
