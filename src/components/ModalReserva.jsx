import { useState } from "react"
import Swal from "sweetalert2"

function ModalReserva({ filme, fecharModal }) {
    const [assentosSelecionados, setAssentosSelecionados] = useState([])
    const totalAssentos = 36
    const assentosDisponiveis = filme.assentosDisponiveis || []

    function toggleAssento(numeroAssento) {
        if (assentosDisponiveis.includes(numeroAssento)) {
            setAssentosSelecionados(prev => {
                if (prev.includes(numeroAssento)) {
                    return prev.filter(a => a !== numeroAssento)
                } else {
                    return [...prev, numeroAssento]
                }
            })
        }
    }

    function confirmarReserva() {
        if (assentosSelecionados.length === 0) {
            Swal.fire('Erro', 'Selecione pelo menos um assento', 'error')
            return
        }

        const reserva = {
            destinoId: filme.id,
            assentos: assentosSelecionados.sort((a, b) => a - b),
            dataReserva: new Date().toISOString()
        }

        fetch(`http://localhost:3000/reservas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        })
            .then(() => {
                Swal.fire('Sucesso!', `Viagem reservada com assentos: ${assentosSelecionados.sort((a, b) => a - b).join(', ')}`, 'success')
                fecharModal()
            })
            .catch(() => {
                Swal.fire('Erro', 'Falha ao realizar a reserva', 'error')
            })
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-3xl border border-slate-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-100">Reservar Viagem - {filme.destinos}</h3>
                    <button
                        onClick={fecharModal}
                        className="text-slate-400 hover:text-slate-100 text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-100 mb-4">Selecione seus assentos</h4>
                    
                    <div className="grid grid-cols-6 gap-2 mb-6 bg-slate-950/50 p-4 rounded-2xl">
                        {Array.from({ length: totalAssentos }, (_, i) => i + 1).map(numero => {
                            const isDisponivel = assentosDisponiveis.includes(numero)
                            const isSelected = assentosSelecionados.includes(numero)

                            return (
                                <button
                                    key={numero}
                                    onClick={() => toggleAssento(numero)}
                                    disabled={!isDisponivel}
                                    className={`
                                        aspect-square rounded-lg font-semibold text-sm transition relative
                                        ${isDisponivel
                                            ? isSelected
                                                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                                                : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                                            : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                                        }
                                    `}
                                    title={isDisponivel ? `Assento ${numero}` : `Assento ${numero} - Indisponível`}
                                >
                                    {numero}
                                    {isSelected && <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">✓</span>}
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-700 rounded"></div>
                            <span className="text-slate-300">Disponível</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-cyan-500 rounded"></div>
                            <span className="text-slate-300">Selecionado</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-slate-800 rounded"></div>
                            <span className="text-slate-300">Indisponível</span>
                        </div>
                    </div>
                </div>

                {assentosSelecionados.length > 0 && (
                    <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                        <p className="text-cyan-200 font-semibold mb-2">
                            Assentos selecionados ({assentosSelecionados.length}):
                        </p>
                        <p className="text-cyan-100">
                            {assentosSelecionados.sort((a, b) => a - b).join(', ')}
                        </p>
                    </div>
                )}

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={fecharModal}
                        className="rounded-2xl bg-slate-700 px-6 py-3 font-semibold text-slate-100 hover:bg-slate-600 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmarReserva}
                        disabled={assentosSelecionados.length === 0}
                        className={`
                            rounded-2xl px-6 py-3 font-semibold transition
                            ${assentosSelecionados.length > 0
                                ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                                : 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-50'
                            }
                        `}
                    >
                        Confirmar Reserva
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalReserva
