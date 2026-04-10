import { Leaf } from "lucide-react";
import { FaInstagram, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import logoClara from "../assets/logoClara.png";

export default function Footer() {
	return (
		<footer data-scroll-section className="bg-emerald-800">
            <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-between gap-3 px-12 py-1 text-center text-pink-900 md:flex-row md:text-left">
                <div className="flex items-center gap-2">
					<img src={logoClara} alt="Lory Cavalcante" className="h-14 w-auto transition-transform group-hover:scale-105" />
					<span className="font-raleway text-xl text-white font-semibold">
						Lory Cavalcante
					</span>
				</div>
				<div className="flex items-center gap-4 font-poppins text-sm">
					<a href="https://www.instagram.com/lorycavalcantenutri" className="transition-colors hover:text-pink-700">
						<FaInstagram className="inline-block h-5 w-5 text-white transition-colors hover:text-pink-900" />
					</a>
					<a href="https://api.whatsapp.com/message/X3RQJTRTIKX5G1?autoload=1&app_absent=0&utm_source=ig" className="transition-colors hover:text-pink-700">
						<FaWhatsapp className="inline-block h-5 w-5 text-white transition-colors hover:text-pink-900" />
					</a>
					<a href="mailto:lory@lcnutricao.com.br" className="transition-colors hover:text-pink-700">
					<MdOutlineMailOutline className="inline-block h-5 w-5 text-white transition-colors hover:text-pink-900" />
					</a>
				</div>
			</div>
			{/* <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-between gap-3 px-12 py-12 text-center text-pink-900 md:flex-row md:text-left">
                <p className="font-poppins text-sm">
					© {new Date().getFullYear()} Lory Cavalcante. - Nutricionista.
				</p>
				<div className="flex items-center gap-4 font-poppins text-sm">
					<a href="#inicio" className="transition-colors hover:text-pink-700">
						Início
					</a>
					<a href="#sobre" className="transition-colors hover:text-pink-700">
						Sobre
					</a>
					<a href="#contato" className="transition-colors hover:text-pink-700">
						Contato
					</a>
				</div>
			</div> */}
		</footer>
	);
}
