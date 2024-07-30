export default function Message({ type, body, time }) {
  const sender = "border border-[#D6D6DE] rounded-sender self-end";
  const receiver = "bg-[#1C8CD6] rounded-receiver text-white self-start";
  return (
    <article
      className={`${
        type === "sender" ? sender : receiver
      } flex flex-col justify-between items-center gap-1 p-3 min-w-[5rem] max-w-[15rem] break-words z-20`}
      style={{
        boxShadow: `-1px -1px 5px 0px #0000000D, 1px 1px 5px 0px #0000000D`,
      }}
    >
      <p
        className={`${
          type === "sender" ? " text-black" : ""
        } w-full text-wrap font-medium text-sm`}
      >
        {body}
      </p>
      <p
        className={`${
          type === "sender" ? "text-[#919191]" : ""
        } w-full text-end font-normal text-xs`}
      >
        {time}
      </p>
    </article>
  );
}
