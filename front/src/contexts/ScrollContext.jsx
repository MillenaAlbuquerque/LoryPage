import LocomotiveScroll from "locomotive-scroll";
import {
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
		const container = document.querySelector("[data-scroll-container]");

		if (!container || scrollRef.current) {
			return;
		}

		try {
			scrollRef.current = new LocomotiveScroll({
				el: container,
				smooth: true,
			});
			setScrollInstance(scrollRef.current);
		} catch (e) {
			console.log(e);
		}

		return () => {
			if (scrollRef.current) {
				scrollRef.current.destroy();
				scrollRef.current = null;
				setScrollInstance(null);
			}
		};
	}, []);

	return (
		<ScrollContext.Provider value={{ scroll: scrollInstance }}>
			{children}
		</ScrollContext.Provider>
	);
};

export const useScroll = () => useContext(ScrollContext);
