import { Star } from "lucide-react";
import { motion } from "framer-motion";
import iogurte from "../assets/iogurte.jpg";
import fotoTatiana from "../assets/Tatiana.png";
import fotoFabiana from "../assets/Fabiana.png";
import fotoLaura from "../assets/Laura.png";


const depoimentos = [
	{
		id: 1,
		foto: fotoTatiana,
		nome: "Tatiana Cristina da Silva Damásio Souza",
		texto:
			"Lory, na verdade eu queria te agradecer por estar vivendo essa experência de novos hábitos. A gente reclama no começo, mas quando vê resultados vindo, metas batidas, e aprendendo a se alimentar de verdade e virando uma rotina, é gratificante. Estou amando esse processo!",
		estrelas: 5,
		cargo: "Advogada e paciente há 2 anos",
	},
	{
		id: 2,
		foto: fotoFabiana,
		nome: "Fabiana Andrade Rantiglieri",
		texto:
			"Minha irmã e eu decidimos procurar uma nutricionista para auxiliar no processo de perda de peso, sou diabética tipo 1. Então vimos o contato da Lory na internet e decidimos conhecer seu trabalho, estou fazendo acompanhamento com ela por 2 meses e meio e venho gostando muito. Profissional comprometida com o que faz, atenciosa e acessível, recomendo!!!",
		estrelas: 5,
		cargo: "Contadora e paciente há 1 ano",
	},
	{
		id: 3,
		foto: fotoLaura,
		nome: "Laura Nascimento dos Santos",
		texto:
			"A Lory é uma pessoa com a aura incrível! Me senti super acolhida desde o primeiro contato. Diariamente resolve qualquer dúvida que eu tenha e vem com a solução para qualquer coisa! Quanto ao plano, é super acessível e dentro da realidade de cada um. Estou amando!",
		estrelas: 5,
		cargo: "Paciente há 6 meses",
	},
];

export default function Depoimentos() {
	return (
		<section data-scroll-section className="bg-pink-50 overflow-hidden" id="depoimentos">
			<div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 lg:py-8 xl:py-14 gap-4 lg:gap-4 xl:gap-6 items-start lg:items-stretch xl:items-stretch w-dvw">
				{/* Esquerda: Título e área para foto */}
				<div className="w-full lg:w-5/12 flex flex-col gap-2 lg:gap-3 xl:gap-4">
					{/* Espaço para foto com título sobreposto */}
					<div
						className="relative w-full aspect-[4/3] lg:aspect-[2/3] xl:aspect-square max-h-[50vw] lg:max-h-[55vh] xl:max-h-[65vh] bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl xl:rounded-3xl overflow-hidden"
						data-scroll
						data-scroll-speed="0.5"
					>
						<img
							src={iogurte}
							// alt="Paciente"
							className="w-full h-full object-cover"
						/>
						
						{/* Overlay escuro para melhorar legibilidade do texto */}
						<div className="absolute inset-0 bg-black/10"></div>
						
						{/* Título sobreposto */}
					<div className="absolute -top-2 lg:-top-3 xl:-top-4 -left-2 lg:-left-3 z-10 h-11 lg:h-13 xl:h-16 w-[13rem] lg:w-[15rem] xl:w-[18rem] bg-pink-50 rounded-br-2xl xl:rounded-br-3xl"></div>
					<div className="absolute top-0 left-0 z-20">
						<h2 className="relative text-2xl lg:text-xl xl:text-5xl leading-none font-poppins text-pink-700 bg-pink-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-br-2xl">
								Depoimentos
							</h2>
						</div>

					<div className="absolute inset-0 flex items-end justify-end p-3 sm:p-4 xl:p-6">
						<h2 className="text-2xl lg:text-3xl xl:text-4xl font-poppins text-white text-right leading-none">
								100+<br /><span className="text-pink-300"></span>
							</h2>
						</div>
					</div>
				</div>

				{/* Direita: Cards de depoimentos */}
				<div className="w-full lg:w-7/12 flex flex-col gap-4 lg:gap-3 xl:gap-4 lg:justify-between xl:justify-between">
					{depoimentos.map((dep, i) => (
						<motion.div
							key={dep.id}
							data-scroll
							data-scroll-speed={0.6 + i * 0.2}
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="relative lg:flex-1 xl:flex-1 flex flex-col justify-between bg-pink-200 rounded-xl xl:rounded-2xl p-3 lg:p-3 xl:p-6 shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform-gpu hover:scale-[0.5] xl:hover:scale-105 group"
						>
							{/* Estrelas no topo */}
							<div className="flex gap-0.5 mb-1.5 xl:mb-2">
								{Array.from({ length: dep.estrelas }).map((_, j) => (
									<Star
										key={j}
										className="w-3 h-3 xl:w-3.5 xl:h-3.5 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							{/* Texto do depoimento */}
								<p className="text-pink-950 font-poppins text-[11px] xl:text-sm leading-relaxed mb-2 xl:mb-3">
								"{dep.texto}"
							</p>

							{/* Footer com nome e cargo */}
						<div className="flex items-center gap-2 xl:gap-2.5">
							<div className="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full overflow-hidden bg-white/30">
									<img src={dep.foto} alt={dep.nome} className="w-full h-full object-cover" />
								</div>
								<div>
								<p className="font-poppins font-semibold text-pink-900 text-[11px] lg:text-xs">{dep.nome}</p>
								{/* <p className="font-poppins text-pink-950 text-[10px] lg:text-[11px]">{dep.cargo}</p> */}
								</div>
							</div>

							{/* Badge circular na borda direita */}
							{/* <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
								<Star className="w-4 h-4 fill-pink-500 text-pink-500" />
							</div> */}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
