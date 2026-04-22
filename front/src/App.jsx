import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { ScrollProvider, useScroll } from "./contexts/ScrollContext";
import SobreMim from "./components/SobreMim";
import Landing from "./components/Landing";
import Especialidades from "./components/Especialidades";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";
import Agendamento from "./pages/Agendamento";

function HashScroller() {
	const location = useLocation();
	const { scroll } = useScroll();
	const prevPathnameRef = useRef(location.pathname);

	// Reseta scroll ao topo apenas quando muda de página (não quando scroll inicializa)
	// e apenas quando não há hash (o hash scroll cuida do posicionamento)
	useEffect(() => {
		const prev = prevPathnameRef.current;
		prevPathnameRef.current = location.pathname;

		// Ignora: mesma página (mudança de hash) ou scroll inicializando
		if (prev === location.pathname) return;
		// Se tem hash, deixa o efeito de hash cuidar (inclui reset implícito via update)
		if (location.hash) return;
		if (!scroll) return;

		scroll.scrollTo(0, { duration: 0, disableLerp: true });
		scroll.update();
		// Segundo update tardio para pegar conteúdo que renderiza após a navegação (ex: AgendamentoCard)
		const timer = setTimeout(() => scroll.update(), 600);
		return () => clearTimeout(timer);
	}, [location.pathname, location.hash, scroll]);

	// Scroll para a seção do hash
	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.slice(1);

		const tryScroll = (attempts = 0) => {
			const target = document.getElementById(id);
			if (target) {
				if (scroll) {
					// Reseta ao topo primeiro para garantir posição limpa
					scroll.scrollTo(0, { duration: 0, disableLerp: true });
					scroll.update();
					// Aguarda o locomotive recalcular antes de animar
					setTimeout(() => {
						scroll.scrollTo(target, { offset: -24, duration: 900 });
					}, 400);
				} else {
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			} else if (attempts < 20) {
				setTimeout(() => tryScroll(attempts + 1), 150);
			}
		};

		const timer = setTimeout(() => tryScroll(), 500);
		return () => clearTimeout(timer);
	}, [location.hash, location.pathname, scroll]);

	return null;
}

function App() {
	const navigate = useNavigate();

	const goToAgendamento = () => navigate("/agendamento");
	const goHome = () => navigate("/");

	return (
		<ScrollProvider>
			<Navbar />
			<HashScroller />
			<ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnHover theme="light" />
			<div className="" data-scroll-container>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Landing />
								<SobreMim />
								<Especialidades />
								<Depoimentos />
								<Contato onAgendarClick={goToAgendamento} />
								<Footer />
							</>
						}
					/>
					<Route path="/agendamento" element={<Agendamento onBack={goHome} />} />
				</Routes>
			</div>
		</ScrollProvider>
	);
}

export default App;
