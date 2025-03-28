import React from "react";

const ContractProgressBarFallback = () => {
    return (
        <div className="w-full h-[86px] px-4 grid place-items-center animate-pulse">
            <div className="pt-4 relative h-full w-full max-w-screen-xl flex flex-col items-center">
                <div className="h-3 w-1/4 bg-gray-300 rounded mb-4"></div>

                <div className="flex w-full justify-between">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-2.5 w-1/4 bg-gray-300 rounded"></div>
                    ))}
                </div>
                <div className="flex w-full justify-around mt-0.5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-2 w-36 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContractProgressBarFallback;
