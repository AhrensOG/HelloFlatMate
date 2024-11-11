import Image from "next/image";
import React from "react";
import { toast } from "sonner";

const ContactCard = ({
  name = "Briana González",
  location = "Villa Edén",
  email,
  phoneNumber,
  image = false,
}) => {
  const handleCopyToClipboard = (text, label) => {
    if (text && typeof text === "string") {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copiado al portapapeles`);
    } else {
      toast.info(`El ${label} no es válido o está ausente`);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 pb-2">
      <div className="h-20 w-20 sm:h-24 sm:w-24 min-w-16 rounded-full relative bg-white border-4 border-resolution-blue">
        <Image
          className="rounded-full p-1"
          src={image || "/profile/profile.png"}
          fill
          alt="Ilustración de perfil"
          objectPosition="top"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h1 className="text-sm sm:text-xl font-medium">{name}</h1>
      <span className="text-sm sm:text-lg font-light">{location}</span>
      <div className="w-full flex justify-evenly items-center">
        <button onClick={() => handleCopyToClipboard(email, "email")}>
          <Image
            src="/owner/tenant_detail/mail.svg"
            alt="Icono de correo"
            width={30}
            height={30}
          />
        </button>
        <button
          onClick={() =>
            handleCopyToClipboard(phoneNumber, "número de teléfono")
          }
        >
          <Image
            src="/owner/tenant_detail/phone.svg"
            alt="Icono de teléfono"
            width={30}
            height={30}
          />
        </button>
        <button>
          <Image
            src="/owner/tenant_detail/pdf.svg"
            alt="Icono de PDF"
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
