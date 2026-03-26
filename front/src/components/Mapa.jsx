import React from "react";
// import { FaLocationDot } from "react-icons/fa6";

const defaultMap = {
	addressLine1: "Centro, Guarulhos - SP",
	embedUrl:
		"https://maps.google.com/maps?q=loc:-23.46679,-46.54058&z=14&output=embed",
	directionsUrl:
		"https://www.google.com/maps/search/?api=1&query=-23.46679%2C-46.54058",
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
