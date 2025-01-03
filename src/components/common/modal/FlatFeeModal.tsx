"use client";

import * as React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

// FlatFeeModal Component
export function FlatFeeModal({ register }: any) {
    return (
        <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Set your offer</h3>
            <p className="text-sm text-gray-500">
                Specify the terms of your offer and what it covers.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {/* Revisions */}
                <div className="space-y-2">
                    <label
                        htmlFor="revisions"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Revisions
                    </label>
                    <select
                        id="revisions"
                        {...register("flatFee.revision", { required: true, valueAsNumber: true })}
                        className="block w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num.toString()}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Delivery */}
                <div className="space-y-2">
                    <label
                        htmlFor="delivery"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Delivery
                    </label>
                    <select
                        id="delivery"
                        {...register("flatFee.delivery", { required: true, valueAsNumber: true })}
                        className="block w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    >
                        {[1, 2, 3, 5, 7, 14].map((days) => (
                            <option key={days} value={days.toString()}>
                                {days} {days === 1 ? "day" : "days"}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            £
                        </span>
                        <input
                            id="price"
                            type="number"
                            {...register("flatFee.price", { required: true, valueAsNumber: true })}
                            placeholder="10,000 max"
                            className="pl-7 w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main Component
export default function App() {
    const { register, handleSubmit, reset } = useForm<FieldValues>();
    const [FlatFee, setFlatFee] = React.useState<FieldValues[]>([]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // Append the new data to the FlatFee array
        setFlatFee((prev) => [...prev, data]);
        console.log("FlatFee Data:", [...FlatFee, data]); // Log the updated FlatFee array
        reset(); // Reset the form after submission
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FlatFeeModal register={register} />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Display the FlatFee array */}
            <div className="mt-6">
                <h4 className="text-lg font-semibold">Captured FlatFee Data:</h4>
                <pre className="bg-gray-100 p-4 rounded-lg">
                    {JSON.stringify(FlatFee, null, 2)}
                </pre>
            </div>
        </div>
    );
}
