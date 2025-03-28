import React from "react";

const DocsV2Fallback = () => {
    return (
        <div className="w-full h-full p-6 bg-white animate-pulse">
            <div className="mb-4">
                <div className="h-8 w-2/3 bg-gray-300 rounded"></div>
            </div>
            <div className="mb-6 space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            </div>
            <div className="mb-4 p-3 rounded-md bg-[#5ce0e5]/10">
                <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
                <ul className="list-disc ml-5 space-y-1">
                    <li className="h-3 w-3/4 bg-gray-300 rounded"></li>
                    <li className="h-3 w-2/3 bg-gray-300 rounded"></li>
                </ul>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-3 mb-4">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-6 p-3 rounded-md bg-[#5ce0e5]/10">
                <div className="h-4 w-1/3 bg-gray-300 rounded mb-1"></div>
                <ul className="list-disc ml-4 space-y-1">
                    <li className="h-3 w-2/3 bg-gray-300 rounded"></li>
                    <li className="h-3 w-1/2 bg-gray-300 rounded"></li>
                </ul>
            </div>
            <div className="mt-6">
                <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default DocsV2Fallback;
