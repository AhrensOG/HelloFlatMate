import React from "react";

const ProfileFormFallback = () => {
    return (
        <div className="w-full p-6 bg-white animate-pulse">
            <div className="mb-6 flex justify-start">
                <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="flex flex-col gap-2 p-2 bg-gray-100 rounded">
                        <div className="h-3 w-1/5 bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default ProfileFormFallback;
