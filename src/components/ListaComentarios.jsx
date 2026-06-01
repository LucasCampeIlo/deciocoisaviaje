function ListaComentarios({ filme, fecharLista }) {

    const comentarios = filme.comentarios || []

    // calcula média das notas
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

            <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl p-6 shadow-2xl">

                <div className="flex justify-between items-center mb-4">

                    <div>
                        <h2 className="text-3xl font-bold">
                            Comentários
                        </h2>

                        <p className="text-lg text-gray-600">
                            {filme.titulo}
                        </p>
                    </div>

                    <button
                        onClick={fecharLista}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Fechar
                    </button>
                </div>

                <div className="bg-violet-100 rounded-lg p-4 mb-5">

                    <p className="text-xl font-bold">
                        Média: ⭐ {media}
                    </p>

                    <p className="text-gray-700">
                        {comentarios.length} avaliações
                    </p>

                </div>

                {comentarios.length === 0 ? (

                    <div className="text-center py-10">
                        <p className="text-xl text-gray-500 italic">
                            Ainda não existem comentários para este filme.
                        </p>
                    </div>

                ) : (

                    <div className="space-y-4">

                        {comentarios.map((comentario, index) => (

                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-4"
                            >

                                <div className="flex justify-between items-center mb-2">

                                    <h3 className="text-lg font-bold">
                                        {comentario.nome}
                                    </h3>

                                    <p className="text-yellow-500 text-lg">
                                        {"⭐".repeat(comentario.nota)}
                                    </p>

                                </div>

                                <p className="text-gray-700 italic">
                                    {comentario.comentario}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    )
}

export default ListaComentarios