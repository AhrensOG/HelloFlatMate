import React from "react";

const ContractDetailV2Fallback = () => {
    return (
        <section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col gap-7 py-4 animate-pulse">
            <div className="w-full bg-white rounded-md shadow-sm">
                <div className="h-6 w-2/3 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 w-1/3 bg-gray-300 rounded my-4"></div>
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="w-full bg-white rounded-md shadow-sm">
                <div className="h-6 w-1/3 bg-gray-300 rounded my-4"></div>
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-40 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
        </section>
    );
};

export default ContractDetailV2Fallback;
