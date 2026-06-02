import { useState } from "react"
import ModalAvaliacao from "./ModalAvaliacao"
import ListaComentarios from "./ListaComentarios"
import ModalReserva from "./ModalReserva"

function CardFilme({ filme, atualizarFilme }) {
    const [modalAberta, setModalAberta] = useState(false)
    const [listaAberta, setListaAberta] = useState(false)
    const [modalReservaAberta, setModalReservaAberta] = useState(false)

    const comentarios = filme.comentarios || []
    let somaNotas = 0

    for (const comentario of comentarios) {
        somaNotas += comentario.nota
    }

    const media = comentarios.length > 0
        ? somaNotas / comentarios.length
        : 0

    const estrelas = "⭐".repeat(Math.round(media))

    return (
        <>
            <div className="flex flex-col lg:flex-row border border-slate-700 bg-slate-900/90 rounded-3xl overflow-hidden shadow-xl shadow-cyan-950/20">
                <div className="relative min-h-[260px] lg:w-64">
                    <img src={filme.imagem} alt={filme.destinos}
                        className="w-full h-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950">
                        {filme.tipo}
                    </span>
                </div>

                <div className="p-5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h2 className="text-3xl font-semibold">{filme.destinos}</h2>
                            <p className="mt-3 text-slate-400">{filme.descricao}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Melhor época</p>
                            <p className="text-xl font-semibold text-cyan-200">{filme.epoca}</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-950/80 border border-slate-700 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Duração</p>
                            <p className="mt-2 text-lg font-semibold text-slate-100">{filme.duracao} dias</p>
                        </div>
                        <div className="rounded-3xl bg-slate-950/80 border border-slate-700 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Companhia aérea</p>
                            <p className="mt-2 text-lg font-semibold text-slate-100">{filme.companhia}</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                        <div className="rounded-3xl bg-slate-950/90 border border-slate-700 p-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Avaliação média</p>
                            <p className="mt-2 text-2xl font-bold text-amber-300">{estrelas}</p>
                            <p className="text-slate-400 text-sm">{media.toFixed(1)} de 5 • {comentarios.length} avaliações</p>
                        </div>

                        <div className="flex flex-wrap items-end gap-3">
                            <button onClick={() => setModalAberta(true)}
                                className="w-full sm:w-auto rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-500 transition">
                                Avaliar Destino
                            </button>

                            <button
                                onClick={() => setListaAberta(true)}
                                className="w-full sm:w-auto rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-700 transition"
                            >
                                Ver Avaliações
                            </button>

                            <button
                                onClick={() => setModalReservaAberta(true)}
                                className="w-full sm:w-auto rounded-3xl bg-green-600 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-green-500 transition"
                            >
                                ✈️ Reservar Viagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {modalAberta && (
                <ModalAvaliacao
                    filme={filme}
                    fecharModal={() => setModalAberta(false)}
                    atualizarFilme={atualizarFilme}
                />
            )}

            {listaAberta && (
                <ListaComentarios
                    filme={filme}
                    fecharLista={() => setListaAberta(false)}
                />
            )}

            {modalReservaAberta && (
                <ModalReserva
                    filme={filme}
                    fecharModal={() => setModalReservaAberta(false)}
                    atualizarFilme={atualizarFilme}
                />
            )}
        </>
    )
}

export default CardFilme