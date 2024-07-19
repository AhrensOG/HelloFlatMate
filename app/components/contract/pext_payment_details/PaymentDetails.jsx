export default function PaymentDetails({ title, body }) {
  return (
    <div className="flex justify-between">
      <h3 className="font-light text-sm">{title}</h3>
      <p className="font-medium text-sm">{body}</p>
    </div>
  );
}
