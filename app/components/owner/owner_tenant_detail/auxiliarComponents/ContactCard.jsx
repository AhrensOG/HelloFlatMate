import Image from "next/image";
import React from "react";

const ContactCard = ({
  name = "Briana González",
  location = "Villa Edén",
  action,
  image = "/profile/profile.jfif",
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 pb-2">
      <div className="h-24 w-24 min-w-16 rounded-full relative bg-white border-4 border-resolution-blue">
        <Image
          className="rounded-full p-1"
          src={image}
          fill
          alt="Ilustracion de perfil"
          objectPosition="top"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1 className="text-2xl font-medium">{name}</h1>
      <span className="text-lg font-light">{location}</span>
      <div className="w-full flex justify-evenly items-center">
        <button>
          <Image
            src="/owner/tenant_detail/mail.svg"
            alt="Ilustracion de perfil"
            width={35}
            height={35}
          />
        </button>
        <button>
          <Image
            src="/owner/tenant_detail/phone.svg"
            alt="Ilustracion de perfil"
            width={35}
            height={35}
          />
        </button>
        <button>
          <Image
            src="/owner/tenant_detail/pdf.svg"
            alt="Ilustracion de perfil"
            width={35}
            height={35}
          />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
