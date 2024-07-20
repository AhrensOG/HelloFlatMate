export default function GuestCard({ quantity, type }) {
    return (
        <div className="flex flex-col border border-[#D1DEE5] p-2 rounded-lg w-[30%]">
            <p className="font-bold text-2xl">{quantity}</p>
            <p className="text-sm text-[#4F7A94] font-normal">{type}</p>
        </div>
    );
}
