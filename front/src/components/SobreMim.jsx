import lory from "../assets/Lory.jpeg";

export default function SobreMim() {
	return (
		<section data-scroll-section className="bg-amber-50 text-slate-200" id="sobre">
			<div className="flex flex-col sm:flex-row h-auto sm:h-[110vh] w-full max-w-7xl mx-auto px-6 sm:px-12 items-center justify-around gap-8 sm:gap-0 pb-12 sm:pb-0 xl:px-6">
				<a
					className="h-full items-center flex cursor-default"
					href="https://www.instagram.com/lorycavalcantenutri/"
					target="_blank"
					data-scroll
					data-scroll-speed="2"
				>
					<img
						src={lory}
						className="h-100 sm:h-auto sm:max-h-2/3 pt-12 cursor-pointer xl:drop-shadow-[60px_-60px_0_rgba(252,211,77,1)]
                                    transition duration-400 hover:scale-120 rounded-lg hover:drop-shadow-none "
					></img>
				</a>
				<div className="w-full sm:max-w-1/2 flex flex-col space-y-6 sm:space-y-12">
					<div
						className="w-full flex flex-col items-center bg-amber-200 p-4 sm:p-6 rounded-xl shadow-xl text-amber-900 space-y-2 sm:space-y-4"
						data-scroll
						data-scroll-speed="3"
					>
						<h1 className="text-3xl sm:text-6xl text-center font-poppins transition duration-400 hover:text-amber-700 w-fit">
							Sobre mim
						</h1>
						<p lang="pt-BR" className="text-sm sm:text-base font-poppins text-pretty transition duration-400 hover:text-amber-700">
							Sou nutricionista clínica, com atuação voltada ao atendimento de adultos que buscam recomposição corporal, reeducação alimentar e melhora da saúde metabólica. Graduada pela Universidade de Guarulhos (UnG) em 2024, conduzo meus atendimentos com base em ciência, individualidade biológica e aplicação prática no dia a dia.
						</p>
						<p lang="pt-BR" className="text-sm sm:text-base font-poppins text-pretty transition duration-400 hover:text-amber-700">
							Meu trabalho vai além de prescrever dietas. É um acompanhamento personalizado, que considera suas individualidades e rotina, respeitando sua realidade, para que os resultados sejam não apenas alcançados, mas mantidos.
						</p>
					</div>
					<button
						className="font-poppins bg-amber-200 text-amber-700 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center
                                    hover:bg-amber-900 hover:text-white   hover:scale-105 transition duration-300 "
						data-scroll
						data-scroll-speed="0" onClick={() => window.open("https://cfn.org.br/consulta-nacional-de-nutricionistas/", "_blank")}
					>
						CRN-3 84882
					</button>
				</div>
			</div>
		</section>
	);
}
