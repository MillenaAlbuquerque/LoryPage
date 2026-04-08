import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import blueberry from "../assets/blueberry.jpg";
import frutas from "../assets/frutas.jpg";
import frutasAmarelo from "../assets/frutasAmarelo.jpg";
import salada from "../assets/salada.jpg";
import saladas from "../assets/saladas.jpg";

const cardData = [
	{
		id: 1,
		title: "Emagrecimento com preservação de massa muscular",
		image: blueberry,
		text: "O objetivo principal é garantir que a maior parte do peso perdido seja gordura corporal, preservando ao máximo a massa muscular. Para isso, não basta apenas reduzir calorias, é fundamental estruturar uma alimentação que sustente o metabolismo e preserve tecidos magros, com atenção especial ao aporte proteico. \nA manutenção da massa muscular é um fator-chave, não só para estética, mas também para saúde metabólica, gasto energético e prevenção do efeito rebote." 
 
	}, {
		id: 2,
		title: "Hipertrofia e melhora da composição corporal",
		image: frutas,
		text: "O processo de hipertrofia é gradual e exige consistência. Ajustes finos na alimentação e na rotina fazem toda a diferença especialmente no equilíbrio entre ingestão calórica, distribuição de nutrientes e suporte à síntese proteica. Seja para ganho de massa muscular ou recomposição corporal, o foco está em otimizar resultados com eficiência e sustentabilidade. "
	}, {
		id: 3,
		title: "Controle de condições metabólicas",
		image: frutasAmarelo,
		text: "Sou"
	}, {
		id: 4,
		title: "Reeducação alimentar",
		image: saladas,
		text: "Sou"
	}
];

export default function Card() {
	const [selectedId, setSelectedId] = useState(null);
	const selectedCard = cardData.find((c) => c.id === selectedId);

	return (
		<>
			<div className="w-full sm:w-1/2 grid grid-cols-2 gap-4">
				{cardData.map((card) => (
					<motion.div
						key={card.id}
						layoutId={`card-${card.id}`}
						onClick={() => setSelectedId(card.id)}
						className="cursor-pointer overflow-hidden rounded-2xl shadow-lg w-fit relative group"
					>
						<img
							src={card.image}
							alt={card.title}
							className="w-full object-cover transition duration-300 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-opacity-0 hover:bg-black/60 transition duration-300 items-center justify-center hidden sm:flex">
							<span className="text-white p-6 text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
								{card.title}
							</span>
						</div>
						<div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
							<p className="text-xs text-center text-white font-semibold">
								{card.title}
							</p>
						</div>
					</motion.div>
				))}
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
							layoutId={`card-${selectedCard.id}`}
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
