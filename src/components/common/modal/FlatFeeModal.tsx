"use client";

import * as React from "react";
import { UseFormRegister, UseFormGetValues, FieldValues } from "react-hook-form";

interface FlatFeeModalProps {
    register: UseFormRegister<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

// FlatFeeModal Component
export function FlatFeeModal({ register }: FlatFeeModalProps) {
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
                        {...register("flatFee.revision", { required: true })}
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
                        htmlFor="days"
                        className="block text-sm font-medium text-gray-700"
                    >
                        How many days
                    </label>
                    <input
                        {...register("flatFee.delivery", { required: true })}
                        id="days"
                        max={90}
                        placeholder="How many days"
                        className="pl-7 w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    />
                    {/* <select
                        id="delivery"
                        {...register("flatFee.delivery", { required: true })}
                        className="block w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none"
                    >
                        {[1, 2, 3, 5, 7, 14].map((days) => (
                            <option key={days} value={days.toString()}>
                                {days} {days === 1 ? "day" : "days"}
                            </option>
                        ))}
                    </select> */}
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
                            $
                        </span>
                        <input
                            id="price"
                            type="number" // Change to text to ensure value is a string
                            {...register("flatFee.price", { required: true })}
                            placeholder="Enter Price"
                            className="pl-7 w-full mt-1 p-2 border border-gray-300 focus:border-primary rounded-[8px] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none  [&::-webkit-outer-spin-button]:appearance-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
