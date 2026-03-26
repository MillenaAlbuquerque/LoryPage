import Card from "./Card"

function Especialidades() {
    return (
        <section data-scroll-section className="bg-cyan-50" id="especialidades">
            <div className="flex gap-12 items-center justify-center h-screen px-12">
                <div className="w-1/2 flex flex-col space-y-12">
                    <div
                        className="flex flex-col items-center bg-cyan-200 p-6 rounded-xl shadow-xl text-cyan-900 space-y-4"
                        data-scroll
                        data-scroll-speed="3"
                    >
                        <h1 className="text-6xl text-center font-poppins transition duration-400 hover:text-cyan-700 w-fit">
                            Minhas especialidades
                        </h1>
                        <p className="text-justify font-poppins transition duration-400 hover:text-cyan-700">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
                            magnam, ad voluptas praesentium, et quibusdam quis nesciunt
                            repellendus distinctio deleniti ea temporibus maiores animi, enim
                            ab aut. Beatae, quisquam modi!
                        </p>
                        <p className="text-justify font-poppins transition duration-400 hover:text-cyan-700">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id
                            magnam, ad voluptas praesentium, et quibusdam quis nesciunt
                            repellendus distinctio deleniti ea temporibus maiores animi, enim
                            ab aut. Beatae, quisquam modi!
                        </p>
                    </div>
                    <button
                        className="font-poppins bg-cyan-300 text-cyan-950 shadow-lg px-8 py-2 text-lg cursor-pointer rounded-xl w-fit self-center
                                    hover:bg-cyan-900 hover:text-white   hover:scale-105 transition duration-300 "
                        data-scroll
                        data-scroll-speed="0"
                    >
                        lorem
                    </button>
                </div>
                <Card />
            </div>

        </section>
    );
}

export default Especialidades;