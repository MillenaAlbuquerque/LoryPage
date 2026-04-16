import { ArrowLeft } from "lucide-react";
import AgendamentoCard from "../components/AgendamentoCard";
import Footer from "../components/Footer";

function Agendamento({ onBack }) {
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

