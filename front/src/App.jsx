import Navbar from "./components/Navbar";
import { ScrollProvider } from "./contexts/ScrollContext";
import SobreMim from "./components/SobreMim";
import Landing from "./components/Landing";
import Especialidades from "./components/Especialidades";

function App() {
	return (
		<>
			<ScrollProvider>
				<Navbar />
				<div className="" data-scroll-container>
					<Landing />
					<SobreMim />
					<Especialidades />
				</div>
			</ScrollProvider>
		</>
	);
}

export default App;
