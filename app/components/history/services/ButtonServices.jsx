export default function ButtonServices({ action, title }) {
  return (
    <section className="flex justify-center">
      <button
        onClick={action}
        className="w-[19.5rem] h-[3.25rem] bg-[#0E1863] text-white rounded-lg"
      >
        {title}
      </button>
    </section>
  );
}
