import { useState, useEffect } from "react"
import { Titulo } from './components/Titulo'

function Favoritos() {
    const [reservas, setReservas] = useState([])

    useEffect(() => {
        async function carregarReservas() {
            try {
                const respostaReservas = await fetch("http://localhost:3000/reservas")
                const dadosReservas = await respostaReservas.json()
                
                const respostaDestinos = await fetch("http://localhost:3000/destinos")
                const dadosDestinos = await respostaDestinos.json()

                const reservasComDestinos = dadosReservas.map(reserva => {
                    const destino = dadosDestinos.find(d => d.id === reserva.destinoId)
                    return {
                        ...reserva,
                        destino: destino
                    }
                })
                
                setReservas(reservasComDestinos)
            } catch (error) {
                console.error('Erro ao carregar reservas:', error)
            }
        }
        carregarReservas()
    }, [])

    function cancelarReserva(reservaId) {
        fetch(`http://localhost:3000/reservas/${reservaId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setReservas(reservas.filter(r => r.id !== reservaId))
        })
        .catch(error => console.error('Erro ao cancelar reserva:', error))
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Titulo />
            <div className="max-w-7xl mx-auto p-4">
                <h2 className="text-3xl my-6 p-3 font-bold">
                    {reservas.length > 0
                        ? `Minhas Viagens Reservadas (${reservas.length})`
                        : 'Você não tem viagens reservadas ainda'}
                </h2>
                {reservas.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3">
                        {reservas.map(reserva => (
                            <div key={reserva.id} className="flex flex-col lg:flex-row border border-slate-700 bg-slate-900/90 rounded-3xl overflow-hidden shadow-xl shadow-cyan-950/20">
                                {reserva.destino && (
                                    <>
                                        <div className="relative min-h-[260px] lg:w-64">
                                            <img src={reserva.destino.imagem} alt={reserva.destino.destinos}
                                                className="w-full h-full object-cover" />
                                            <span className="absolute left-4 top-4 rounded-full bg-green-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950">
                                                Reservado
                                            </span>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                                    <div>
                                                        <h2 className="text-3xl font-semibold">{reserva.destino.destinos}</h2>
                                                        <p className="mt-3 text-slate-400">{reserva.destino.descricao}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Melhor época</p>
                                                        <p className="text-xl font-semibold text-cyan-200">{reserva.destino.epoca}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                    <div className="rounded-3xl bg-slate-950/80 border border-slate-700 p-4">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Duração</p>
                                                        <p className="mt-2 text-lg font-semibold text-slate-100">{reserva.destino.duracao} dias</p>
                                                    </div>
                                                    <div className="rounded-3xl bg-slate-950/80 border border-slate-700 p-4">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Companhia aérea</p>
                                                        <p className="mt-2 text-lg font-semibold text-slate-100">{reserva.destino.companhia}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-5 p-4 rounded-3xl bg-green-500/10 border border-green-500/30">
                                                    <p className="text-xs uppercase tracking-[0.3em] text-green-400 font-semibold mb-2">Assentos Reservados</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {reserva.assentos && reserva.assentos.map(assento => (
                                                            <span key={assento} className="bg-green-600 text-slate-950 px-3 py-1 rounded-lg font-semibold text-sm">
                                                                {assento}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-3 text-sm text-slate-400">
                                                    <p>Reservado em: {new Date(reserva.dataReserva).toLocaleDateString('pt-BR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}</p>
                                                </div>
                                            </div>

                                            <div className="mt-5 flex gap-3 justify-end">
                                                <button
                                                    onClick={() => cancelarReserva(reserva.id)}
                                                    className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
                                                >
                                                    Cancelar Reserva
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Favoritos







