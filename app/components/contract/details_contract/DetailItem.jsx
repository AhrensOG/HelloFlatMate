export default function DetailItem({ title, body }) {
  return (
    <div className="flex justify-between text-sm">
      <h4 className="font-light">{title}</h4>
      <p className="font-medium">{body}</p>
    </div>
  );
}
