import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import UserMessage from "./UserMessageBot";

export default function BotModal() {
    return (
        <motion.aside
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute bottom-8 right-[5rem] w-[17rem] min-h-[28rem] rounded-tl-lg rounded-tr-lg rounded-bl-lg border-[#D6D6DE] shadow-lg flex flex-col"
            style={{
                boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.1), 0px 11px 11px rgba(0, 0, 0, 0.09),
                            0px 24px 14px rgba(0, 0, 0, 0.05), 0px 43px 17px rgba(0, 0, 0, 0.01), 0px 67px 19px rgba(0, 0, 0, 0)`,
            }}
        >
            <div className="w-full h-[2rem] bg-blue-500 rounded-tl-lg rounded-tr-lg text-white pt-1 pl-2">Bot</div>
            <div className="w-full flex-grow bg-white flex flex-col overflow-y-auto">
                <UserMessage message={"Hello! How can I help you today?"} />
            </div>
            <div className="flex items-center">
                <label htmlFor="message" className="hidden"></label>
                <div
                    className="flex justify-between w-full items-center p-2 gap-1 border-t border-[#D6D6DE] h-12"
                    style={{
                        boxShadow: `0px -3px 6px rgba(0, 0, 0, 0.1), 0px -11px 11px rgba(0, 0, 0, 0.09),
                                    0px -24px 14px rgba(0, 0, 0, 0.05), 0px -43px 17px rgba(0, 0, 0, 0.01), 0px -67px 19px rgba(0, 0, 0, 0)`,
                    }}
                >
                    <input type="text" id="message" className="w-full appearance-none outline-none bg-gray-100 rounded-3xl h-9 px-2" />
                    <button className="w-7 h-7 bg-blue-500 rounded-full">
                        <PaperAirplaneIcon className="text-white w-4 h-4 m-auto" />
                    </button>
                </div>
            </div>
        </motion.aside>
    );
}
