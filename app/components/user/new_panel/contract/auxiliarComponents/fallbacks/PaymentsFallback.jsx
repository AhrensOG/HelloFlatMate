import React from "react";

const PaymentsFallback = () => {
    return (
        <div className="w-full h-full p-6 bg-white animate-pulse">
            <div className="mb-4">
                <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="mb-6 space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            </div>
            <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            <div className="h-3 w-20 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default PaymentsFallback;
