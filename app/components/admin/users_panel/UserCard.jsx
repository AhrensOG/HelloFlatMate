export default function UserCard({ type, name, email }) {
  const typeUser = (type) => {
    switch (type) {
      case "super":
        return (
          <span className="w-full bg-[#0C1660] text-xs rounded-lg text-white p-2">
            Super Admin
          </span>
        );
        break;
      case "owner":
        return (
          <span className="w-full bg-[#0C1660] text-xs rounded-lg text-white p-2">
            Propietario
          </span>
        );
        break;
      case "user":
        return (
          <span className="w-full bg-[#21ABCC] text-xs rounded-lg text-white p-2">
            Inquilino
          </span>
        );
        break;
      default:
        return (
          <span className="w-full bg-[#EFF4FA] text-xs rounded-lg text-[#757575] p-2">
            Propietario
          </span>
        );
        break;
    }
  };

  return (
    <article className="shadow-amenity-check w-full h-24 flex justify-between items-center gap-2 p-4 rounded-lg ">
      <div className="flex flex-col gap-2 break-words w-32">
        <h2 className="font-semibold text-base text-[#222B45]">{name}</h2>
        <p className="text-sm text-[#8F9BB3] font-normal underline">{email}</p>
      </div>
      <div className="w-24 flex justify-center items-center text-center">
        {typeUser(type)}
      </div>
    </article>
  );
}
