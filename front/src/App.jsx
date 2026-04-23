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
	// Rastreia o pathname anterior a QUALQUER mudança de rota
	const prevPathnameRef = useRef(location.pathname);

	// Atualiza o ref a cada mudança de localização
	useEffect(() => {
		return () => {
			prevPathnameRef.current = location.pathname;
		};
	}, [location.pathname, location.hash]);

	// Reset ao topo quando muda de página sem hash
	useEffect(() => {
		if (location.hash) return;
		if (!scroll) return;

		scroll.scrollTo(0, { duration: 0, disableLerp: true });
		scroll.update();
		const timer = setTimeout(() => scroll.update(), 600);
		return () => clearTimeout(timer);
	}, [location.pathname, scroll]);

	// Scroll para a seção do hash
	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.slice(1);

		// Veio de outra página se o pathname anterior era diferente
		const crossPage = prevPathnameRef.current !== location.pathname;

		const doScroll = () => {
			const target = document.getElementById(id);
			if (!target) return false;

			if (scroll) {
				if (crossPage) {
					scroll.scrollTo(0, { duration: 0, disableLerp: true });
					requestAnimationFrame(() => {
						scroll.update();
						requestAnimationFrame(() => {
							scroll.scrollTo(target, { offset: -24, duration: 900 });
						});
					});
				} else {
					scroll.scrollTo(target, { offset: -24, duration: 900 });
				}
			} else {
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
			return true;
		};

		const tryScroll = (attempts = 0) => {
			if (doScroll()) return;
			if (attempts < 20) setTimeout(() => tryScroll(attempts + 1), 100);
		};

		const timer = setTimeout(() => tryScroll(), crossPage ? 100 : 0);
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
