import Image from "next/image";

export default function ThankYou({ title, subTitle, body, action, callback }) {
  return (
    <>
      <div className="w-full flex justify-center h-[70vh]">
        <div className="flex flex-col items-center justify-center w-full max-w-screen-sm">
          <div className="grow flex flex-col items-center justify-center gap-8 ">
            <Image
              src={"/howitworks/verificado.gif"}
              width={130}
              height={130}
            />
            <div>
              <h1 className="text-2xl font-semibold text-center">{title}</h1>
              <h2 className="font-semibold text-base text-center">
                {subTitle}
              </h2>
            </div>

            <div>
              <h3 className="text-center text-gray-600 font-normal">{body}</h3>
            </div>
          </div>
          <div className="flex items-end w-full p-2">
            <button
              className="text-white w-full h-[3rem] font-bold bg-[#1FAECC] rounded-lg border border-[#1FAECC]"
              onClick={callback}
            >
              {action}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
