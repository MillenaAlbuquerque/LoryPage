import lory from "../../src/assets/lory-fake.jpg";

export default function SobreMim() {
	return (
		<section data-scroll-section className="bg-amber-50 text-slate-200" id="sobre">
			<div className="flex h-[110vh] w-dvw px-12 items-center justify-around">
				<a
					className="h-full items-center flex cursor-default"
					href="https://www.instagram.com/lorycavalcantenutri/"
					target="_blank"
					data-scroll
					data-scroll-speed="2"
				>
					<img
						src={lory}
						className="max-h-2/3 pt-12 cursor-pointer xl:drop-shadow-[60px_-60px_0_rgba(252,211,77,1)]
                                    transition duration-400 hover:scale-120 rounded-lg hover:drop-shadow-none "
					></img>
				</a>
				<div className="max-w-1/2 flex flex-col space-y-12">
					<div
						className="w-full flex flex-col items-center bg-amber-200 p-6 rounded-xl shadow-xl text-amber-900 space-y-4"
						data-scroll
						data-scroll-speed="3"
					>
						<h1 className="text-6xl text-center font-poppins transition duration-400 hover:text-amber-700 w-fit">
							Sobre mim
						</h1>
						<p className="text-justify font-poppins transition duration-400 hover:text-amber-700">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
							magnam, ad voluptas praesentium, et quibusdam quis nesciunt
							repellendus distinctio deleniti ea temporibus maiores animi, enim
							ab aut. Beatae, quisquam modi!
						</p>
						<p className="text-justify font-poppins transition duration-400 hover:text-amber-700">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
							magnam, ad voluptas praesentium, et quibusdam quis nesciunt
							repellendus distinctio deleniti ea temporibus maiores animi, enim
							ab aut. Beatae, quisquam modi!
						</p>
					</div>
					<button
						className="font-poppins bg-amber-300 text-amber-950 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center
                                    hover:bg-amber-900 hover:text-white   hover:scale-105 transition duration-300 "
						data-scroll
						data-scroll-speed="0"
					>
						lorem
					</button>
				</div>
			</div>
		</section>
	);
}
