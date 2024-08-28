export default function ProfileItems({ title, body, icon }) {
  return (
    <article className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <h2 className="px-2 text-black font-medium text-lg">{title}</h2>
        <span className="w-6 h-6 text-[#000000CC]">{icon}</span>
      </div>
      <p className="w-full h-10 bg-[#E7E6E6] rounded-lg p-3 flex items-center text-base font-normal">
        {body}
      </p>
    </article>
  );
}
