import LocomotiveScroll from "locomotive-scroll";
import {
	Children,
	createContext,
	useRef,
	useState,
	useEffect,
	useContext,
} from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
	const scrollRef = useRef(null);
	const [scrollInstance, setScrollInstance] = useState(null);

	useEffect(() => {
		try {
			scrollRef.current = new LocomotiveScroll({
				el: document.querySelector("[data-scroll-container]"),
				smooth: true,
			});
			setScrollInstance(scrollRef.current);
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<ScrollContext.Provider value={{ scroll: scrollInstance }}>
			{children}
		</ScrollContext.Provider>
	);
};

export const useScroll = () => useContext(ScrollContext);
