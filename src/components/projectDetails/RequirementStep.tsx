"use client"

import { AiOutlinePaperClip } from "react-icons/ai";
import React from 'react'
import { Plus } from 'lucide-react'

interface FileUpload {
    id: number
    caption: string
    file?: File
}

export default function RequirementsStep() {
    const [fileUploads, setFileUploads] = React.useState<FileUpload[]>([
        { id: 1, caption: '' }
    ])
    const [message, setMessage] = React.useState('')

    const addMoreFiles = () => {
        setFileUploads([
            ...fileUploads,
            { id: fileUploads.length + 1, caption: '' }
        ])
    }

    const handleCaptionChange = (id: number, caption: string) => {
        setFileUploads(fileUploads.map(upload =>
            upload.id === id ? { ...upload, caption } : upload
        ))
    }

    const handleFileChange = (id: number, file: File) => {
        setFileUploads(fileUploads.map(upload =>
            upload.id === id ? { ...upload, file } : upload
        ))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitted:', { fileUploads, message })
    }

    return (
        <div className=" mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add further Requirements</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Please upload the relevant documents for review (if applicable).
                    </p>

                    <div className="space-y-4">
                        {fileUploads.map((upload) => (
                            <div key={upload.id} className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Write caption"
                                    value={upload.caption}
                                    onChange={(e) => handleCaptionChange(upload.id, e.target.value)}
                                    className="w-full px-4 py-2  border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                        <label className="inline-flex gap-2 items-center px-4 py-2 bg-primary text-white rounded-[20px] hover:bg-[#6D28D9] transition-colors cursor-pointer">
                            Upload
                            <AiOutlinePaperClip
                                className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1"
                            />
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        handleFileChange(fileUploads[fileUploads.length - 1].id, file)
                                    }
                                }}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={addMoreFiles}
                            className="inline-flex gap-2 rounded-[20px] items-center px-3 py-1.5 bg-[#E9E9EA] text-[#030304]  hover:bg-gray-200 transition-colors text-sm"
                        >
                            Add more
                            {/* <Plus className="w-7 h-w-7 ml-1 bg-white rounded-full p-2" /> */}
                            <Plus
                                className="text-[15px] bg-white rounded-full text-[#25314C] transition-all cursor-pointer w-7 h-7 p-1"
                            />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-700">
                        Additional Message...
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your Message"
                        className="w-full px-4 py-2   text-sm  border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    />
                </div>


            </form>
        </div>
    )
}

