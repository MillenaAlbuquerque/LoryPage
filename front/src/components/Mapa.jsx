import React from "react";
// import { FaLocationDot } from "react-icons/fa6";

const defaultMap = {
	addressLine1: "R. Francisco Antônio Miranda, 58 - Jardim Guarulhos",
	embedUrl:
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.752491488859!2d-46.53362130000001!3d-23.4693908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef55dc8f3aec3%3A0x852a3f3031760710!2sR.%20Francisco%20Ant%C3%B4nio%20Miranda%2C%2058%20-%20Jardim%20Guarulhos%2C%20Guarulhos%20-%20SP%2C%2007090-140!5e0!3m2!1spt-BR!2sbr!4v1775609695774!5m2!1spt-BR!2sbr",
	directionsUrl:
		"https://www.google.com/maps/search/?api=1&query=R.+Francisco+Ant%C3%B4nio+Miranda%2C+58%2C+Jardim+Guarulhos%2C+Guarulhos-SP",
};

function Mapa({
	addressLine1 = defaultMap.addressLine1,
	embedUrl = defaultMap.embedUrl,
	directionsUrl = defaultMap.directionsUrl,
	className = "",
}) {
	return (
		<div
			className={`relative h-full w-full overflow-hidden rounded-xl border border-green-200 bg-green-200 shadow-xl ${className}`}
		>
			<iframe
				title="Mapa do consultorio"
				src={embedUrl}
				className="h-full w-full border-0"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
			{/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<FaLocationDot className="h-8 w-8 text-green-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]" />
			</div> */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-700/30 via-transparent to-transparent" />
			<a
				href={directionsUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute bottom-3 left-3 rounded-full bg-[#96edb6] px-3 py-1 text-xs font-medium text-green-50 backdrop-blur-sm transition duration-300 hover:bg-green-700"
			>
				{addressLine1}
			</a>
		</div>
	);
}

export default Mapa;
