import { useEffect, useState } from "react";
import logo from "../assets/lory-logo-removebg-preview.png";
import { useScroll } from "../contexts/ScrollContext";

export default function Navbar() {
	const { scroll } = useScroll();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (!scroll) return;

		const onScroll = args => {
			setScrolled(args.scroll.y > 40);
		};

		scroll.on("scroll", onScroll);

		return () => {
			scroll.off("scroll", onScroll);
		};
	}, [scroll]);

	return (
		<nav
			className={`fixed font-poppins top-0 w-full z-30 transitio duration-300 flex justify-between px-24 items-center h-16 
				bg-white/10 backdrop-blur-sm  `}
		>
			<img
				src={logo}
				alt="Logo da Lory"
				className="w-fit h-24 object-contain"
			/>
			<div className="flex space-x-24 justify-end">
				<a
					href=""
					className={`text-xl transition-all z-70 duration-300 
						text-green-950 text-shadow-md  hover:text-yellow-500 font-medium`}
				>
					Sobre mim
				</a>
				<a
					href=""
					className={`text-xl transition-all z-70 duration-300 
						text-green-950 text-shadow-md  hover:text-yellow-500 font-medium`}
				>
					Áreas
				</a>
				<a
					href=""
					className={`text-xl transition-all z-70 duration-300 
						text-green-950 text-shadow-md  hover:text-yellow-500 font-medium`}
				>
					Contatos
				</a>
			</div>
		</nav>
	);
}
