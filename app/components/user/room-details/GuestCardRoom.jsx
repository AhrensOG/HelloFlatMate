import Image from "next/image";

export default function GuestCardRoom({ type, boolean, number }) {
  if (type === "bathroom" && !boolean) {
    return null;
  }
  return (
    <div>
      {type === "bed" ? (
        <div>
          <div className="relative h-10 w-10">
            <Image
              src={"/create-property/bed.png"}
              fill
              alt="Cama"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        </div>
      ) : type === "bathroom" && boolean ? (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/toilet.png"}
            fill
            alt="Baño"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      ) : type === "couple" && boolean ? (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/couple.png"}
            fill
            alt="Cama para pareja"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      ) : (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/singleman.png"}
            fill
            alt="Cama para una persona"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      )}
    </div>
  );
}
