import Navbar from "./components/Navbar";
import { ScrollProvider } from "./contexts/ScrollContext";
import SobreMim from "./components/SobreMim";
import Landing from "./components/Landing";
import Especialidades from "./components/Especialidades";
import Depoimentos from "./components/Depoimentos";
import Contato from "./components/Contato";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<ScrollProvider>
				<Navbar />
				<div className="" data-scroll-container>
					<Landing />
					<SobreMim />
					<Especialidades />
					<Depoimentos />
					<Contato />
					<Footer />
				</div>
			</ScrollProvider>
		</>
	);
}

export default App;
