import { ArrowLeft } from "lucide-react";
import AgendamentoCard from "../components/AgendamentoCard";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useScroll } from "../contexts/ScrollContext";

function Agendamento({ onBack }) {
	const { scroll } = useScroll();

	// Chama scroll.update() múltiplas vezes para garantir que o Locomotive
	// recalcule a altura correta conforme o conteúdo async vai carregando
	useEffect(() => {
		if (!scroll) return;
		scroll.scrollTo(0, { duration: 0, disableLerp: true });
		const t1 = setTimeout(() => scroll.update(), 50);
		const t2 = setTimeout(() => scroll.update(), 400);
		const t3 = setTimeout(() => scroll.update(), 1000);
		const t4 = setTimeout(() => scroll.update(), 2000);
		return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
	}, [scroll]);

	return (
		<>
			<div data-scroll-section className="bg-green-50 min-h-screen px-4 py-6 md:px-6 md:py-8 lg:px-8 xl:p-8">
				<div className="mx-auto max-w-6xl">
					<AgendamentoCard />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Agendamento;

