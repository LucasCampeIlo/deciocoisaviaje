function ListaComentarios({ filme, fecharLista }) {

    const comentarios = filme.comentarios || []

    const media = comentarios.length > 0
        ? (
            comentarios.reduce(
                (acum, item) => acum + item.nota,
                0
            ) / comentarios.length
        ).toFixed(1)
        : 0

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-950 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl shadow-cyan-950/40 border border-slate-700 text-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold">Avaliações</h2>
                        <p className="text-lg text-slate-400">{filme.destinos}</p>
                    </div>
                    <button
                        onClick={fecharLista}
                        className="rounded-3xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700"
                    >
                        Fechar
                    </button>
                </div>

                <div className="bg-slate-900 rounded-3xl p-5 mb-5 border border-slate-700">
                    <p className="text-xl font-bold text-cyan-200">Média: ⭐ {media}</p>
                    <p className="text-slate-400">{comentarios.length} avaliações registradas</p>
                </div>

                {comentarios.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-slate-500 italic">
                            Ainda não existem avaliações para este destino.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comentarios.map((comentario, index) => (
                            <div
                                key={index}
                                className="border border-slate-700 rounded-3xl p-4 bg-slate-900"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold text-slate-100">{comentario.nome}</h3>
                                    <p className="text-amber-300 text-lg">{"⭐".repeat(comentario.nota)}</p>
                                </div>
                                <p className="text-slate-300 italic">{comentario.comentario}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListaComentarios