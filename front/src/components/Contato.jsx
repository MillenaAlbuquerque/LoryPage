
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { Video } from 'lucide-react';



import Mapa from "./Mapa";
import escritorio from "../assets/escritorio.png";


const socialItems = [
  {
    icon: FaInstagram,
    label: "@lorycavalcantenutri",
    href: "https://www.instagram.com/lorycavalcantenutri",
  },
  {
    icon: FaWhatsapp,
    label: "(11) 99999-9999",
    href: "https://api.whatsapp.com/message/X3RQJTRTIKX5G1?autoload=1&app_absent=0&utm_source=ig",
  },
  {
    icon: MdOutlineMailOutline,
    label: "lory@nutricionista.com",
    href: "mailto:lory@nutricionista.com",
  },
];

const infoItems = [
  {
    icon: FaRegClock,
    label: "Segunda a Sábado, 8h às 18h",
    href: "#",
  },
  {
    icon: Video,
    label: "Presencial ou Online",
    href: "#",
  },
];

function Contato() {
    return (
        <section data-scroll-section className="bg-green-50" id="contato">
            <div className="flex h-screen items-center justify-center gap-10 px-10">
                <div
                    className="w-full lg:w-1/2 flex flex-col space-y-2 p-4 text-green-900"
                    data-scroll
                    data-scroll-speed="3"
                >
                    <h1 className="w-fit text-center font-poppins text-5xl transition duration-400 hover:text-green-700 lg:text-6xl">
                        Consultas
                    </h1>
                    <p className="text-justify font-poppins transition duration-400 hover:text-green-700">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
                        magnam, ad voluptas praesentium, et quibusdam quis nesciunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
                        magnam, ad voluptas praesentium, et quibusdam quis nesciunt. Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    </p>
                        <div className="flex w-full gap-6 mt-4">
                            {[socialItems, infoItems].map((group, gi) => (
                                <div key={gi} className="flex flex-1 flex-col gap-4">
                                    {group.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/item flex items-center gap-2 py-2 transition-colors  duration-300 rounded-full hover:bg-green-200/80 px-3"
                                            aria-label={item.label}
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B9F7CE] text-green-900 transition-colors group-hover/item:text-green-700">
                                                <item.icon className="h-6 w-5" />
                                            </div>
                                            <span className="text-sm font-medium text-green-900 transition-colors group-hover/item:text-green-700">
                                                {item.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* <div className="absolute -right-8 -bottom-5 z-20 h-40 w-70 overflow-hidden rounded-xl border border-pink-300/80 shadow-2xl transition-all duration-500 ease-in-out group-hover:h-44 group-hover:w-100">
                            <Mapa className="h-full w-full" />
                        </div> */}
                </div>

                <div className="group relative hidden w-full lg:flex lg:w-2/4" data-scroll data-scroll-speed="2">
                    <div className="w-full overflow-hidden rounded-xl bg-transparent p-3 shadow-gray-300/50 transition duration-500 hover:shadow-xl">
                        <img
                            src={escritorio}
                            alt="Escritorio de atendimento"
                            className="h-[24rem] w-full rounded-lg object-cover transition duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="absolute -bottom-3 -left-3 z-20 h-34 w-76 overflow-hidden rounded-xl border border-green-300/80 shadow-xl transition-all duration-500 ease-in-out hover:h-[26rem] hover:w-[calc(100%-0.1rem)]">
                        <Mapa className="h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contato;