export default function WhatIncludes({ title, items }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">{title}</h2>
      <ul className="list-disc pl-5 m-2 text-base font-normal">
        {items.map((item, index) => (
          <li className="p-1" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
