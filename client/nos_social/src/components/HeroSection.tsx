function HeroSection() {

    return (
        <section className="lg:flex p-4 lg:py-16 lg:px-72 bg-blue-800 text-white">
            <div>
                <h1 className="font-bold text-2xl lg:text-4xl pb-3 lg:pb-10">Bem-vindo(a) a Nós Social - São Paulo!</h1>
                <p className="text-base lg:text-2xl pb-4 lg:pr-28">Nosso objetivo é oferecer um espaço onde as ONG possam se cadastrar e compartilhar suas atividades beneficentes com o público. Aqui, você encontrará uma variedade de projetos e iniciativas realizadas por ONGs locais, desde campanhas de arrecadação até eventos de conscientização.</p>
                <p className="text-base lg:text-2xl pb-4 lg:pr-28">Ao explorar nossa plataforma, você terá a oportunidade de se envolver com a comunidade e fazer a diferença de maneira significativa. Encontre ONGs que estejam alinhadas com seus interesses e valores, descubra oportunidades de voluntariado e apoie causas que você se importa.</p>
                <p className="text-base lg:text-2xl pb-4 lg:pb-12 lg:pr-28">Junte-se a nós nesta jornada de solidariedade e impacto social. Vamos trabalhar juntos para construir um futuro melhor para todos.</p>
                <button className="bg-white hover:bg-slate-100 mb-4 lg:mb-0 py-4 px-6 font-bold text-gray-900 rounded-lg text-sm lg:text-lg uppercase">
                    <strong>Cadastrar-se como usuário</strong>
                </button>
            </div>
            <div className="w-full flex justify-center items-center">
                <img className="w-full" src="images/hero.jpeg" alt="Imagem de vários icones de pessoas conectadas." />
            </div>
        </section>
    )
}
export default HeroSection;