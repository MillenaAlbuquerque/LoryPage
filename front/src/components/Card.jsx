import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import blueberry from "../assets/blueberry.jpg";
import frutas from "../assets/frutas.jpg";
import frutasAmarelo from "../assets/frutasAmarelo.jpg";
import salada from "../assets/salada.jpg";
import saladas from "../assets/saladas.jpg";
import peso from "../assets/peso.jpg";
import hipertrofia from "../assets/hipertrofia.jpg";
import reeducacao from "../assets/reeducacao.jpg";
import controle from "../assets/controle.jpg";
import Autoplay from "embla-carousel-autoplay";


import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

const cardData = [
	{
		id: 1,
		title: "Emagrecimento saudável",
		image: peso,
		text: "O objetivo principal é garantir que a maior parte do peso perdido seja gordura corporal, preservando ao máximo a massa muscular. Para isso, não basta apenas reduzir calorias, é fundamental estruturar uma alimentação que sustente o metabolismo e preserve tecidos magros, com atenção especial ao aporte proteico. \nA manutenção da massa muscular é um fator-chave, não só para estética, mas também para saúde metabólica, gasto energético e prevenção do efeito rebote." 
 
	}, {
		id: 2,
		title: "Hipertrofia corporal",
		image: hipertrofia,
		text: "O processo de hipertrofia é gradual e exige consistência. Ajustes finos na alimentação e na rotina fazem toda a diferença especialmente no equilíbrio entre ingestão calórica, distribuição de nutrientes e suporte à síntese proteica. Seja para ganho de massa muscular ou recomposição corporal, o foco está em otimizar resultados com eficiência e sustentabilidade. "
	}, {
		id: 3,
		title: "Controle metabólico",
		image: controle,
		text: "As doenças crônicas não transmissíveis, como dislipidemias, hipertensão arterial e resistência à insulina, possuem origem multifatorial, metabólicos e comportamentais. Mesmo em indivíduos com predisposição genética, a combinação de uma rotina alimentar equilibrada com hábitos de vida saudáveis pode contribuir significativamente para: \n- Controle de marcadores metabólicos\n- Redução de riscos cardiovasculares\n- Prevenção da progressão para doenças mais graves, como o Diabetes tipo 2\n- O acompanhamento nutricional é direcionado para ajuste de porções, qualidade dos alimentos e estratégias que promovam equilíbrio metabólico de forma prática e sustentável."
	}, {
		id: 4,
		title: "Reeducação alimentar",
		image: reeducacao,
		text: "A reeducação alimentar é o processo de reconstruir a relação com a comida, entendendo o papel dos alimentos e nutrientes na manutenção da saúde. Durante o acompanhamento, esse processo acontece de forma natural e progressiva, alinhado aos seus objetivos — seja emagrecimento, hipertrofia ou controle metabólico. A proposta é construir uma rotina alimentar que:\n- Faça sentido dentro do seu dia a dia\n- Inclua alimentos acessíveis e equilibrados\n- Promova autonomia nas escolhas  "
	}
];

export default function Card() {
	const [selectedId, setSelectedId] = useState(null);
	const selectedCard = cardData.find((c) => c.id === selectedId);
	const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));

	return (
		<>
			<div className="w-full sm:w-1/2">
				<Carousel
					orientation="horizontal"
					opts={{ align: "start", loop: true }}
					plugins={[plugin.current]}
					className="w-full px-0"
				>
				<CarouselContent>
						{cardData.map((card) => (
							<CarouselItem
								key={card.id}
								className=" cursor-pointer"
								onClick={() => setSelectedId(card.id)}
							>
								<div className="relative overflow-hidden rounded-2xl shadow-lg h-64 sm:h-80 group">
									<img
										src={card.image}
										alt={card.title}
										className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
									/>
									<div className="absolute top-0 left-0 z-20">
										<p className="text-md font-poppins font-semibold text-cyan-900 bg-cyan-50 px-3 py-2 rounded-br-2xl leading-tight whitespace-nowrap">
											{card.title}
										</p>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-3 bg-transparent text-white hover:text-cyan-500" />
					<CarouselNext className="right-3 bg-transparent text-white hover:text-cyan-500" />
				</Carousel>
			</div>

			<AnimatePresence>
				{selectedCard && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center"
						onClick={() => setSelectedId(null)}
					>
						<motion.div
							className="absolute inset-0 bg-black "
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.25 }}
							className="bg-white rounded-2xl z-10 w-11/12 max-w-lg"
						>
							<img
								src={selectedCard.image}
								alt={selectedCard.title}
								className="w-full h-40 object-cover rounded-t-2xl"
							/>
							<p className="p-4 whitespace-pre-line text-justify">
								{selectedCard.text}
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
