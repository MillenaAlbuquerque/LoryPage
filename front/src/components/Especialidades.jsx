import Card from "./Card"
import { useScroll } from "../contexts/ScrollContext";


function Especialidades() {
    const { isMobile } = useScroll();

    return (
        <section data-scroll-section className="bg-cyan-50" id="especialidades">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center justify-center min-h-screen px-6 sm:px-12 pt-8 sm:pt-0 pb-8 sm:pb-0 max-w-7xl mx-auto w-full">
                <div className="w-full sm:w-1/2 flex flex-col space-y-6 sm:space-y-12">
                    <div
                        className="flex flex-col items-center bg-cyan-200 p-6 rounded-xl shadow-xl text-cyan-900 space-y-4"
                        data-scroll
                        data-scroll-speed="2"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-poppins transition duration-400 hover:text-cyan-700 w-full break-words">
                            Minhas especialidades
                        </h1>
                        <p className="text-sm sm:text-base  font-poppins transition duration-400 hover:text-cyan-700">
                            Sei que a nutrição é uma ferramenta essencial não apenas para transformação estética, mas principalmente como base para prevenção de doenças e promoção de saúde a longo prazo. 
                        </p>
                        <p className="text-sm  sm:text-base font-poppins transition duration-400 hover:text-cyan-700">
                            Mais do que seguir um plano, você aprende a se alimentar com consciência, estratégia e liberdade. 
 
Sem extremismos, sem terrorismo nutricional, apenas ciência aplicada de forma prática, sustentável e alinhada à sua rotina. 

Porque resultados consistentes não vêm de soluções rápidas, mas de estratégias bem construídas. 
                        </p>
                    </div>
                    <button
                        className="hidden sm:block font-poppins bg-cyan-300 text-cyan-950 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center
                                    hover:bg-cyan-900 hover:text-white   hover:scale-105 transition duration-300 "
                        data-scroll
                        data-scroll-speed="0"
                    >
                        {isMobile ? "Veja acima meus serviços!" : "Explore meus serviços!"}
                    </button>
                </div>
                <Card />
            </div>

        </section>
    );
}

export default Especialidades;