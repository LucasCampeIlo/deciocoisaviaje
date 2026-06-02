import { Link } from 'react-router'

export function Titulo() {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-950 text-cyan-100 p-4 shadow-lg shadow-cyan-900/30">
                <div className="flex items-center gap-4 ">
                    <img src="/public/loguito.png" alt="TravelGate Logo"
                        className="w-16 h-16 rounded-full border border-cyan-400/40" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Singapore Airlines</h1>
                        <h2 className="text-lg text-cyan-200 italic">Destinos premium e avaliações de viagem</h2>
                    </div>
                </div>
                <div className="mt-3 sm:mt-0 text-sm tracking-wide text-slate-300">
                    <span className="block">Voos, pacotes e inspiração</span>
                    <span className="block">Experiências com o estilo das grandes companhias aéreas</span>
                </div>
            </div>
            <nav className='flex flex-wrap justify-center gap-3 bg-slate-900 text-slate-100 p-3 border-t border-slate-700'>
                <Link to="/" className='px-5 py-2 bg-slate-800 text-cyan-200 font-semibold rounded-full no-underline hover:bg-slate-700'>Home</Link>
                <Link to="/inclusao" className='px-5 py-2 bg-slate-800 text-cyan-200 font-semibold rounded-full no-underline hover:bg-slate-700'>Novo Destino</Link>
                <Link to="/pesquisa" className='px-5 py-2 bg-slate-800 text-cyan-200 font-semibold rounded-full no-underline hover:bg-slate-700'>Buscar</Link>
                <Link to="/favoritos" className='px-5 py-2 bg-cyan-600 text-slate-950 font-semibold rounded-full no-underline hover:bg-cyan-500'>Reservas</Link>
            </nav>
        </>
    )
}