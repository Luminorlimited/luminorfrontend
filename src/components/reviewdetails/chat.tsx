import Image, { StaticImageData } from 'next/image'
import { Paperclip, Send, Smile } from 'lucide-react'
import demoprofile from '@/assets/images/demoimg.png'
import { IoVideocamOutline } from "react-icons/io5";


interface Message {
    sender: string
    avatar: string | StaticImageData
    message: string
    time: string
    attachments?: {
        name: string
        size: string
        preview: string | StaticImageData
    }[]
}

const messages: Message[] = [
    {
        sender: "Jane Cooper",
        avatar: demoprofile,
        message: "Hello, I've place the order.",
        time: "09:40"
    },
    {
        sender: "John Watson",
        avatar: demoprofile,
        message: "Thank you for your order. I have started reviewing your project.",
        time: "09:40"
    },
    // {
    //     sender: "Jane Cooper",
    //     avatar: demoprofile,
    //     message: "In this pdf file, you will find all information about my case. If you need any other information, let me know I will send you.",
    //     time: "09:40",
    //     attachments: [
    //         {
    //             name: "Documents.jpg",
    //             size: "25 MB",
    //             preview: offer
    //         }
    //     ]
    // },
    {
        sender: "John Watson",
        avatar: demoprofile,
        message: "Thank you for the document.",
        time: "09:40"
    }
]

export default function Chat() {
    return (
        <div className="bg-[#FAFAFA] rounded-lg shadow-sm rounded-b-[18px]">
            <div className="p-4 bg-[#74C5FF] rounded-t-[15px]">
                <div className="flex items-center gap-3">
                    <Image
                        src={demoprofile}
                        alt="Jane Cooper"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <div className="font-medium text-white">Jane Cooper Accepted the Offer</div>
                    </div>
                </div>
            </div>
            <div className="p-4 space-y-6">
                {messages.map((message, index) => (
                    <div key={index} className="flex gap-3">
                        <Image
                            src={message.avatar}
                            alt={message.sender}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <div className="font-medium">{message.sender}</div>
                                <div className="text-gray-500 text-sm">{message.time}</div>
                            </div>
                            <p className="text-gray-700">{message.message}</p>
                            {message.attachments && (
                                <div className="mt-3">
                                    <div className="text-sm font-medium mb-2">Attachments</div>
                                    {message.attachments.map((attachment, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Image
                                                src={attachment.preview}
                                                alt={attachment.name}
                                                width={60}
                                                height={60}
                                                className="rounded-lg"
                                            />
                                            <div>
                                                <div className="font-medium">{attachment.name}</div>
                                                <div className="text-sm text-gray-500">{attachment.size}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t flex items-center gap-3 ">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <input
                    type="text"
                    placeholder="Write message here..."
                    className="flex-1 bg-transparent focus:outline-none text-gray-700  bg-white rounded-[18px] py-2 px-3 "
                />
                <button className="p-2 bg-white rounded-full">
                    <Smile className="w-5 h-5 text-black" />
                </button>
                <button className="p-2 bg-white rounded-full">
                    <IoVideocamOutline className="w-5 h-5 text-black" />
                </button>
                <button className="p-2 bg-primary rounded-full hover:bg-indigo-700 ">
                    <Send className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    )
}

