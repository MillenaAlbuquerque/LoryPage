import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

	// Update locomotive scroll on every route change so it remeasures the new DOM
	useEffect(() => {
		if (!scroll) return;
		const timer = setTimeout(() => {
			scroll.scrollTo(0, { duration: 0, disableLerp: true });
			scroll.update();
		}, 100);
		return () => clearTimeout(timer);
	}, [location.pathname, scroll]);

	// Handle hash scrolling — wait for pathname reset (100ms) before starting
	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.slice(1);
		const tryScroll = (attempts = 0) => {
			const target = document.getElementById(id);
			if (target) {
				if (scroll) {
					scroll.update();
					setTimeout(() => {
						scroll.scrollTo(target, { offset: -24, duration: 900 });
					}, 150);
				} else {
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			} else if (attempts < 15) {
				setTimeout(() => tryScroll(attempts + 1), 150);
			}
		};
		// 500ms: espera o menu fechar (350ms) + reset do pathname (100ms)
		setTimeout(() => tryScroll(), 500);
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
