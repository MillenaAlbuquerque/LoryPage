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
		title: "Blueberry",
		image: blueberry,
		text: "Sou"
	}, {
		id: 2,
		title: "Frutas",
		image: frutas,
		text: "Sou"
	}, {
		id: 3,
		title: "Frutas Fundo Amarelo",
		image: frutasAmarelo,
		text: "Sou"
	}, {
		id: 4,
		title: "Salada",
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
						<div className="absolute inset-0 bg-opacity-0 hover:bg-black/60 transition duration-300 flex items-center justify-center">
							<span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
								{card.title}
							</span>
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
							className="absolute inset-0 bg-black"
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.div
							layoutId={`card-${selectedCard.id}`}
							className="bg-white rounded-2xl z-10 w-96"
						>
							<img
								src={selectedCard.image}
								alt={selectedCard.title}
								className="w-full object-cover rounded-t-2xl"
							/>
							<p className="p-4">
								{selectedCard.text}
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
