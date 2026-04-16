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
			"Agradeço a Lory por estar vivendo essa experência de novos hábitos. A gente reclama no começo, mas quando vê resultados vindo, metas batidas, e aprendendo a se alimentar de verdade e virando uma rotina, é gratificante. Estou amando esse processo!",
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
		<section data-scroll-section className="bg-pink-50 overflow-hidden md:max-h-[65vh] lg:max-h-[60vh] xl:max-h-none" id="depoimentos">
			<div className="flex flex-col md:grid md:grid-cols-[5fr_7fr] px-5 sm:px-4 lg:px-6 xl:px-10 py-6 sm:py-8 md:py-6 lg:py-4 xl:py-10 gap-3 lg:gap-4 xl:gap-4 w-full max-w-7xl mx-auto">
				{/* Esquerda: Título e área para foto */}
				<div className="w-full relative flex flex-col">
					{/* Espaço para foto com título sobreposto */}
					<div
						className="relative w-full aspect-[4/3] md:aspect-auto md:h-full md:max-h-[60vh] lg:max-h-[55vh] xl:max-h-[85vh] max-h-[50vw] bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl overflow-hidden"
						data-scroll
						data-scroll-speed="0.5"
					>
						<img
							src={iogurte}
							className="w-full h-full object-cover"
						/>
						
						<div className="absolute inset-0 bg-black/10"></div>
						
					<div className="absolute -top-2 -left-2 z-10 h-11 md:h-10 xl:h-12 w-[13rem] md:w-[12rem] xl:w-[15rem] bg-pink-50 rounded-br-2xl"></div>
					<div className="absolute top-0 left-0 z-20">
						<h2 className="relative text-3xl md:text-2xl xl:text-5xl leading-none font-poppins text-pink-700 bg-pink-50 px-2 lg:px-3 py-1.5 rounded-br-2xl">
								Depoimentos
							</h2>
						</div>

					<div className="absolute inset-0 flex items-end justify-end p-3 sm:p-4 xl:p-4">
						<h2 className="text-2xl md:text-2xl xl:text-3xl font-poppins text-white text-right leading-none">
								100+
							</h2>
						</div>
					</div>
				</div>

				{/* Direita: Cards de depoimentos */}
				<div className="w-full flex flex-col gap-2 md:gap-2 xl:gap-3 md:justify-between">
					{depoimentos.map((dep, i) => (
						<motion.div
							key={dep.id}
							data-scroll
							data-scroll-speed={0.6 + i * 0.2}
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="relative flex-1 flex flex-col justify-between bg-pink-200 rounded-xl p-2.5 md:p-2.5 lg:p-3 xl:p-4 shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform-gpu hover:scale-[1.02] group"
						>
							{/* Estrelas no topo */}
							<div className="flex gap-0.5 mb-1 xl:mb-2">
								{Array.from({ length: dep.estrelas }).map((_, j) => (
									<Star
										key={j}
										className="w-3 h-3 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							{/* Texto do depoimento */}
							<p className="text-pink-950 font-poppins text-[10px] lg:text-[11px] xl:text-xs leading-relaxed mb-1.5 xl:mb-2">
								"{dep.texto}"
							</p>

							{/* Footer com nome e cargo */}
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 lg:w-7 lg:h-7 shrink-0 rounded-full overflow-hidden bg-white/30">
									<img src={dep.foto} alt={dep.nome} className="w-full h-full object-cover" />
								</div>
								<div>
									<p className="font-poppins font-semibold text-pink-900 text-[10px] lg:text-[11px] xl:text-[11px]">{dep.nome}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
