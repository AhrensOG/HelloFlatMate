import Image from "next/image";

export default function GuestCardRoom({ type, boolean, number }) {
  return (
    <div>
      {type === "bed" ? (
        <div>
          <div className="relative h-10 w-10">
            <Image
              src={"/create-property/bed.png"}
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        </div>
      ) : type === "bathroom" && boolean ? (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/toilet.png"}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      ) : type === "couple" && boolean ? (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/couple.png"}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      ) : (
        <div className="relative h-10 w-10">
          <Image
            src={"/create-property/singleman.png"}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      )}
    </div>
  );
}
