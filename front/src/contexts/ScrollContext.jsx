import LocomotiveScroll from "locomotive-scroll";
import {
	createContext,
	useRef,
	useState,
	useEffect,
	useContext,
} from "react";

const ScrollContext = createContext();

const isTouchDevice = () =>
	typeof window !== "undefined" &&
	(
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		window.matchMedia("(any-pointer: coarse)").matches
	);

export const ScrollProvider = ({ children }) => {
	const scrollRef = useRef(null);
	const [scrollInstance, setScrollInstance] = useState(null);
	const [isMobile, setIsMobile] = useState(() => isTouchDevice());

	useEffect(() => {
		const mobile = isTouchDevice();
		setIsMobile(mobile);

		if (mobile) return;

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

	const updateScroll = () => {
		if (scrollRef.current) {
			scrollRef.current.update();
		}
	};

	return (
		<ScrollContext.Provider value={{ scroll: scrollInstance, isMobile, updateScroll }}>
			{children}
		</ScrollContext.Provider>
	);
};

export const useScroll = () => useContext(ScrollContext);
