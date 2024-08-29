import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function MessageInput({ action }) {
  const [message, setMessage] = useState("");
  const onChangeInput = (e) => {
    e.preventDefault();
    setMessage("");
  };

  const onSubmitMessage = (message) => {
    action(message);
  };

  return (
    <form onSubmit={(e) => preventDefault(e)} action="" className="w-full">
      <section
        className="flex items-center justify-between gap-2 p-2 h-[5.5rem] w-full border border-[#D6D6DE] rounded-xl "
        style={{
          boxShadow: `0px -3px 6px 0px rgba(0, 0, 0, 0.1), 0px -11px 11px 0px rgba(0, 0, 0, 0.09),
    0px -24px 14px 0px rgba(0, 0, 0, 0.05), 0px -43px 17px 0px rgba(0, 0, 0, 0.01), 0px -67px 19px 0px rgba(0, 0, 0, 0)`,
          zIndex: 10,
        }}
      >
        <div className="flex gap-2 items-center justify-between w-full">
          <div className=" grow">
            <label hidden htmlFor="message"></label>
            <input
              onChange={onChangeInput}
              className="appareance-none outline-none bg-[#F5F5F5] w-full h-10 rounded-full p-3"
              placeholder="Escribe un mensaje..."
              type="text"
              name="message"
              id="message"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              className="h-9 w-9 rounded-full p-1 bg-[#d9d9d9ff] flex justify-center items-center"
              type="button"
            >
              <PlusIcon />
            </button>
            <button
              onClick={() => onSubmitMessage(message)}
              className="h-11 w-11 rounded-full bg-[#0E155F] p-[10px] text-white flex justify-center items-center"
              type="button"
            >
              <PaperAirplaneIcon />
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
