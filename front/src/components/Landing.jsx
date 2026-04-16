import fundo from "../../src/assets/pessego.jpg";
import fundoMobile from "../../src/assets/pessego-copy.jpg";
import { useScroll } from "../contexts/ScrollContext";

export default function Landing() {
	const { scroll, isMobile } = useScroll();

	const handleNavigate = (event, href) => {
		if (!href?.startsWith("#")) return;

		event.preventDefault();
		const target = document.querySelector(href);

		if (target && scroll) {
			scroll.scrollTo(target, { offset: -24, duration: 900 });
		} else if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section
			data-scroll-section
			id="inicio"
			className="relative w-dvw flex flex-col justify-center overflow-hidden"
			style={{ height: 'calc(var(--vh, 1dvh) * 100)' }}
		>
			<div className="absolute inset-0 sm:fixed sm:-inset-8 overflow-hidden">
				<img
					src={fundoMobile}
					className="sm:hidden h-full w-full object-cover object-center scale-100 brightness-80"
					data-scroll
					data-scroll-speed="-8"
				></img>
				<img
					src={fundo}
					className="hidden sm:block h-full w-full object-cover object-center scale-100 brightness-90"
					data-scroll
					data-scroll-speed="-8"
				></img>
				<div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[0.5px]"></div>
				<div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 via-45% to-transparent"></div>
				<div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_left_center,rgba(226, 205, 205, 0.9)_0%,rgba(70,28,28,0.62)_32%,rgba(70,28,28,0.18)_58%,transparent_85%)]"></div>
			</div>
			<div className="relative z-10 flex flex-col max-w-full px-10 md:pl-12 gap-5 sm:gap-0">
				<div className="space-y-4 sm:-space-y-8 md:max-w-4/10">
					<h1
						className="text-6xl sm:text-8xl text-left sm:text-center font-raleway text-shadow-sm text-shadow-black/40 font-light text-green-700 sm:text-green-700"
						{...(!isMobile && { "data-scroll": true, "data-scroll-speed": "2" })}
					>
						Lory Cavalcante
					</h1>
					<h2
						className="text-6xl text-left sm:text-center font-sacramento text-amber-400	"
						{...(!isMobile && { "data-scroll": true, "data-scroll-speed": "2" })}
					>
						Nutricionista
					</h2>
				</div>
				<p
					className="text-sm  sm:text-base text-left md:text-justify md:max-w-4/10 font-roboto text-yellow-900 "
					{...(!isMobile && { "data-scroll": true, "data-scroll-speed": "2" })}
				>
					Emagreça, ganhe massa muscular e controle sua saúde com precisão científica.
					<br />
					Atendimento nutricional personalizado para adultos que buscam recomposição corporal, controle de doenças crônicas e alta performance física e metabólica. Aqui, cada conduta é baseada em ciência. 
				</p>
				<div
					{...(!isMobile && { "data-scroll": true, "data-scroll-speed": "2" })}
				className="flex flex-col sm:flex-row items-center sm:justify-center gap-6 md:max-w-4/10"
				>
					<a
						href="#contato"
						onClick={(event) => handleNavigate(event, "#contato")}
						className="text-white text-shadow-sm w-fit py-2 px-6 cursor-pointer
					 font-poppins font-normal border-2 border-green-700 bg-green-700 rounded-2xl shadow-xl hover:bg-green-600
					 hover:border-green-700 transition duration-300"
					>
						Me chame
					</a>
					<a
						href="#especialidades"
						onClick={(event) => handleNavigate(event, "#especialidades")}
						className="text-yellow-900 text-shadow-sm w-fit py-2 px-6 cursor-pointer
					 font-poppins font-normal border-2 border-yellow-500 bg-transparent rounded-2xl shadow-xl hover:bg-yellow-500
					 hover:border-yellow-500 transition duration-300"
					>
						Conheça meu trabalho
					</a>
				</div>
			</div>
		</section>
	);
}
