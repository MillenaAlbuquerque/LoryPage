
import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { Video } from 'lucide-react';



import Mapa from "./Mapa";
import consultorio from "../assets/consultorio.png";


const socialItems = [
  {
    icon: FaInstagram,
    label: "@lorycavalcantenutri",
    href: "https://www.instagram.com/lorycavalcantenutri",
  },
  {
    icon: FaWhatsapp,
    label: "(11) 91583-2334",
    href: "https://api.whatsapp.com/message/X3RQJTRTIKX5G1?autoload=1&app_absent=0&utm_source=ig",
  },
  {
    icon: MdOutlineMailOutline,
    label: "lory@lcnutricao.com.br",
    href: "mailto:lory@lcnutricao.com.br",
  },
];

const infoItems = [
  {
    icon: FaRegClock,
    label: "Segunda a Sábado, 8h às 18h",
  },
  {
    icon: Video,
    label: "Presencial ou Online",
  },
];

function Contato({ onAgendarClick }) {
    return (
        <section data-scroll-section className="bg-green-50" id="contato">
            <div className="flex flex-col lg:flex-row h-auto lg:h-screen items-center justify-center gap-6 lg:gap-10 px-6 lg:px-8 py-12 lg:py-0">
                <div
                    className="w-full lg:w-1/2 flex flex-col space-y-2 p-4 text-green-900"
                    data-scroll
                    data-scroll-speed="3"
                >
                    <h1 className="w-fit text-center font-poppins text-5xl transition duration-400 hover:text-green-700 lg:text-6xl">
                        Consultas
                    </h1>
                    <p className="text-sm sm:text-base text-justify font-poppins transition duration-400 hover:text-green-700">
                        Se você sente que:<br/> 
• Já tentou emagrecer e não conseguiu manter os resultados <br/> 
• Tem dificuldade em ganhar massa muscular mesmo treinando <br/> 
• Possui colesterol alto, pressão elevada ou risco de diabetes <br/> 
• Vive com cansaço, baixa energia e sem constância <br/> 
Saiba que o problema não é falta de esforço, é falta de direcionamento adequado, agende uma consulta comigo! 

                    </p>
                        <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-6 mt-4">
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
                        <button
                        type="button"
                        onClick={onAgendarClick}
                        className="font-poppins bg-[#B9F7CE] text-green-900 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center hover:bg-green-900 hover:text-white hover:scale-105 transition duration-300"
                        data-scroll
                        data-scroll-speed="0"
                    >
                        Agendar Consulta
                    </button>

                        {/* <div className="absolute -right-8 -bottom-5 z-20 h-40 w-70 overflow-hidden rounded-xl border border-pink-300/80 shadow-2xl transition-all duration-500 ease-in-out group-hover:h-44 group-hover:w-100">
                            <Mapa className="h-full w-full" />
                        </div> */}
                </div>

                <div className="group relative flex flex-col w-full lg:w-2/4 gap-4" data-scroll data-scroll-speed="2">
                    <div className="w-full h-40 lg:h-96 overflow-hidden rounded-xl bg-transparent shadow-gray-300/50 transition duration-500 hover:shadow-xl">
                        <img
                            src={consultorio}
                            alt="Escritorio de atendimento"
                            className="h-full w-full rounded-lg object-cover transition duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="relative h-58 w-full lg:absolute lg:-bottom-20 lg:-left-6 lg:z-20 lg:h-44 lg:w-76 overflow-hidden rounded-xl border border-green-300/80 shadow-xl transition-all duration-500 ease-in-out lg:hover:h-[29rem] lg:hover:w-[calc(100%+2rem)]">
                        <Mapa className="h-full w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contato;