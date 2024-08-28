import Image from "next/image";

export default function ThankYou({ title, subTitle, body, action, callback }) {
  return (
    <>
      <div className="flex flex-col items-center grow h-[70vh]">
        <div className="grow flex flex-col items-center justify-center gap-8 ">
          <div className="w-20 h-20">
            <Image src={"/check-icon.svg"} width={80} height={80} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-center">{title}</h1>
            <h2 className="font-semibold text-base text-center">{subTitle}</h2>
          </div>

          <div>
            <h3 className="text-center text-[#919191] text-sm font-normal">
              {body}
            </h3>
          </div>
        </div>
        <div className="flex items-end w-full p-2">
          <button
            className="text-white w-full h-[3rem] bg-payment-button-gradient rounded-lg hover:bg-payment-button-gradient-hover border border-[#162067]"
            onClick={callback}
          >
            {action}
          </button>
        </div>
      </div>
    </>
  );
}
