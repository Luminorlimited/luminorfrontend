


export default function ProjectDescModal({ register }: any) {


    return (
        <div className="space-y-4">
            {/* Project Name Input */}
            <div>
                <label className="text-base font-semibold mb-2 block">Project Name</label>
                <input
                    type="text"
                    {...register("projectName", { required: true })}
                    // ref={register({ required: true })}

                    placeholder="Enter your project name"
                    className="w-full rounded-[8px] border border-gray-300 p-2 focus:ring-2 focus:ring-primary focus:border-none outline-none"
                />
            </div>

            {/* Description Textarea */}
            <div>
                <label className="text-base font-semibold mb-2 block">Description</label>
                <textarea
                    {...register("description", { required: true })}
                    placeholder="Write your description"
                    className="w-full rounded-[8px] min-h-[120px] border border-gray-300 p-2 resize-none focus:ring-2 focus:ring-primary focus:border-none outline-none"
                />
            </div>


        </div>
    );
}
