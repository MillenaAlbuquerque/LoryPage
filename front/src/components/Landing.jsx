import fundo from "../../src/assets/pessego.jpg";
export default function Landing() {
	return (
		<section
			data-scroll-section
			className="bg-cover h-screen w-dvw flex flex-col justify-center"
		>
			<img
				src={fundo}
				className="h-screen w-full object-cover fixed top-0"
				data-scroll
				data-scroll-speed="-8"
			></img>
			<div className="flex flex-col max-w-4/10 pl-12">
				<div className="-space-y-8">
					<h1
						className="text-8xl text-center font-raleway text-shadow-sm text-shadow-black/40 font-light text-green-700"
						data-scroll
						data-scroll-speed="2"
					>
						Lory Cavalcante
					</h1>
					<h2
						className="text-7xl text-center font-sacramento text-amber-400	"
						data-scroll
						data-scroll-speed="2"
					>
						Nutricionista
					</h2>
				</div>
				<p
					className="text-lg text-justify font-roboto text-yellow-900"
					data-scroll
					data-scroll-speed="2"
				>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore
					distinctio nostrum porro fugiat tenetur quaerat veritatis quam facere,
					obcaecati tempora voluptatum omnis, neque nemo harum nesciunt libero?
					Omnis, laborum maxime!
				</p>
				<div
					data-scroll
					data-scroll-speed="2"
					className="flex items-center justify-center gap-6"
				>
					<button
						className="text-white text-shadow-sm w-fit py-1 px-4 cursor-pointer
					 font-poppins font-normal border-2 border-green-500 bg-green-500 rounded-2xl shadow-xl hover:bg-green-600
					 hover:border-green-600 transition duration-300"
					>
						Me chame
					</button>
					<button
						className="text-yellow-500 text-shadow-sm w-fit py-1 px-4 cursor-pointer
					 font-poppins font-normal border-2 border-yellow-400 bg-transparent rounded-2xl shadow-xl hover:bg-yellow-400
					 hover:border-yellow-400 hover:text-white transition duration-300"
					>
						Conheça meu trabalho
					</button>
				</div>
			</div>
		</section>
	);
}
