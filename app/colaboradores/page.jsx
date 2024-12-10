"use client";
import React from "react";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import Footer_1 from "../components/public/home/Footer";
import SecondaryNavbar from "../components/public/home/SecondaryNavbar";
import Image from "next/image";
import Link from "next/link";

const Universities = () => {
  const universities = [
    {
      name: "Universitat de València",
      logo: "/home/new_home/Universitat-de-València.png",
      url: "https://www.uv.es/",
    },
    {
      name: "Universitat Politècnica de València",
      logo: "/home/new_home/UPV-Emblem.png",
      url: "https://www.upv.es/",
    },
    {
      name: "Universidad Católica de Valencia San Vicente Mártir",
      logo: "/home/new_home/ucv.jpg",
      url: "https://www.ucv.es/",
    },
    {
      name: "Universidad CEU Cardenal Herrera",
      logo: "/home/new_home/png-transparent-ceu-san-pablo-university-ceu-cardinal-herrera-university-central-european-university-centro-de-estudios-universitarios-travel-logo.png",
      url: "https://www.uchceu.es/",
    },
    {
      name: "Universidad Internacional de Valencia",
      logo: "/home/new_home/139694.png",
      url: "https://www.universidadviu.com/",
    },
    {
      name: "Universidad Europea de Valencia",
      logo: "/home/new_home/universidadeuropea_white-980x551.jpg",
      url: "https://universidadeuropea.es/valencia/",
    },
    {
      name: "Universidad Internacional Menéndez Pelayo (UIMP)",
      logo: "/home/new_home/channels4_profile.jpg",
      url: "https://www.uimp.es/",
    },
    {
      name: "Florida Universitària",
      logo: "/home/new_home/maxresdefault.jpg",
      url: "https://www.floridauniversitaria.es/",
    },
    {
      name: "Universidad a Distancia de Madrid (UDIMA)",
      logo: "/home/new_home/logo-udima-horizontal-COLOR.png",
      url: "https://www.udima.es/",
    },
  ];

  return (
    <section className="bg-white w-full">
      {/* Header */}
      <header className="bg-[url('/home/new_home/bg1.png')] bg-cover bg-no-repeat bg-center">
        <SecondaryNavbar />
        <div className="w-full flex justify-center items-center py-40">
          <h1 className="text-2xl font-bold max-w-screen-lg text-center text-white">
            Universidades de la Comunidad Valenciana
          </h1>
        </div>
      </header>

      {/* Grid de Universidades */}
      <div id="universidades" className="max-w-screen-lg mx-auto py-16 px-4">
        <h2 className="text-center text-4xl font-bold mb-14">
          Universidades de la Comunidad Valenciana
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center shadow-lg rounded-lg p-4"
            >
              <Link href={university.url} target="_blank">
                <Image
                  src={university.logo}
                  alt={university.name}
                  width={150}
                  height={150}
                  className="rounded-md"
                />
              </Link>
              <p className="mt-4 text-lg font-semibold">{university.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer_1 />
    </section>
  );
};

export default Universities;
