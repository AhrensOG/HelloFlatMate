import OurService from "./type_rooms/OurService";
import Feature from "./features/Feature";
import Separator from "./features/Separator";
import featureData from "./features/featuresData";
import { plus_jakarta } from "@/font";
import React from "react";

export default function Features() {
  return (
    <section className={`${plus_jakarta.className}`}>
      <OurService />
      <section className="flex flex-col gap-3 justify-center items-center py-10 px-2 bg-[url('/guest_home/features/bg.svg')] bg-no-repeat bg-cover">
        {featureData.map((feature, index) => (
          <React.Fragment key={feature.title}>
            <Feature data={feature} />
            {index < featureData.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </section>
    </section>
  );
}
