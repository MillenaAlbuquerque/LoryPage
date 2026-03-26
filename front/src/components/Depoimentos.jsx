import { Star } from "lucide-react";
import { motion } from "framer-motion";
import iogurte from "../assets/iogurte.jpg";


const depoimentos = [
	{
		id: 1,
		nome: "Ana Luíza",
		texto:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id magnam, ad voluptas praesentium, et quibusdam quis nesciun repellendus distinctio deleniti ea temporibus maiores animi, enimab aut.",
		estrelas: 5,
		cargo: "Advogada e paciente há 2 anos",
	},
	{
		id: 2,
		nome: "Carla Mendes",
		texto:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id magnam, ad voluptas praesentium, et quibusdam quis nesciun repellendus distinctio deleniti ea temporibus maiores animi.",
		estrelas: 5,
		cargo: "Contadora e paciente há 1 ano",
	},
	{
		id: 3,
		nome: "Juliana Rocha",
		texto:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id magnam, ad voluptas praesentium, et quibusdam quis nesciun repellendus distinctio deleniti ea temporibus maiores animi.",
		estrelas: 5,
		cargo: "Paciente há 6 meses",
	},
];

export default function Depoimentos() {
	return (
		<section data-scroll-section className="bg-pink-50 overflow-hidden" id="depoimentos">
			<div className="flex min-h-[88vh] xl:min-h-screen px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-14 xl:py-24 gap-2 lg:gap-8 items-center max-w-7xl mx-auto">
				{/* Esquerda: Título e área para foto */}
				<div className="w-3/5 xl:w-7/12 flex flex-col gap-3 xl:gap-4">
					{/* Espaço para foto com título sobreposto */}
					<div
						className="relative w-full aspect-square bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl xl:rounded-3xl overflow-hidden"
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
						<div className="absolute -top-3 lg:-top-4 xl:-top-5 -left-3 lg:-left-4 z-10 h-14 lg:h-16 xl:h-20 w-[16rem] lg:w-[18rem] xl:w-[22.5rem] bg-pink-50 rounded-br-2xl xl:rounded-br-3xl"></div>
						<div className="absolute top-0 left-0 z-20">
							<h2 className="relative text-3xl lg:text-4xl xl:text-5xl leading-none font-poppins text-pink-700 bg-pink-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-br-2xl">
								Depoimentos
							</h2>
						</div>

						<div className="absolute inset-0 flex items-end justify-end p-4 sm:p-6 xl:p-8">
							<h2 className="text-3xl lg:text-4xl xl:text-5xl font-poppins text-white text-right leading-none">
								50+<br /><span className="text-pink-300"></span>
							</h2>
						</div>
					</div>
				</div>

				{/* Direita: Cards de depoimentos */}
				<div className="w-2/5 xl:w-5/12 flex flex-col gap-3 xl:gap-4">
					{depoimentos.map((dep, i) => (
						<motion.div
							key={dep.id}
							data-scroll
							data-scroll-speed={0.6 + i * 0.2}
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="relative bg-pink-200 rounded-xl xl:rounded-2xl p-4 lg:p-5 xl:p-6 shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform-gpu hover:scale-[0.5] xl:hover:scale-105 group"
						>
							{/* Estrelas no topo */}
							<div className="flex gap-1 mb-2.5 xl:mb-3">
								{Array.from({ length: dep.estrelas }).map((_, j) => (
									<Star
										key={j}
										className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>

							{/* Texto do depoimento */}
							<p className="text-pink-950 font-poppins text-[13px] xl:text-sm leading-relaxed mb-3 xl:mb-4">
								"{dep.texto}"
							</p>

							{/* Footer com nome e cargo */}
							<div className="flex items-center gap-2.5 xl:gap-3">
								<div className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full bg-white/30 flex items-center justify-center text-pink-900 font-poppins font-bold text-sm">
									{dep.nome.charAt(0)}
								</div>
								<div>
									<p className="font-poppins font-semibold text-pink-900 text-xs lg:text-sm">{dep.nome}</p>
									<p className="font-poppins text-pink-950 text-[11px] lg:text-xs">{dep.cargo}</p>
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
