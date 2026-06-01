import { useState } from "react"
import ModalAvaliacao from "./ModalAvaliacao"
import ListaComentarios from "./ListaComentarios"
import Favoritos from "../favoritos"

function CardFilme({ filme, atualizarFilme }) {
    const [modalAberta, setModalAberta] = useState(false)
    const [listaAberta, setListaAberta] = useState(false)

    // comentários do filme: calcular a média das notas
    const comentarios = filme.comentarios

    // soma das notas
    let somaNotas = 0

    for (const comentario of comentarios) {
        somaNotas += comentario.nota
    }

    // média
    const media = comentarios.length > 0
        ? somaNotas / comentarios.length
        : 0

    // estrelas
    const estrelas = "⭐".repeat(Math.round(media))

    const favorito = filme.Favoritos

    return (
        <>
            <div className="flex border-2 border-gray-500 rounded-lg p-3">
                <img src={filme.imagem} alt="Capa"
                    className="w-48 aspect-2/3 mr-3 object-cover" />
                <div>
                    <h2 className="text-2xl font-bold">{filme.titulo}</h2>
                    <p className="font-bold text-lg my-2">
                        {filme.genero} - {filme.duracao} min
                    </p>
                    <p className="font-bold text-lg my-2">
                        Ano: {filme.ano} - {filme.plataforma}
                    </p>
                    <p className="italic text-gray-600 text-sm">
                        {filme.sinopse}
                    </p>
                    <p className="text-yellow-500 font-bold my-3 flex justify-between">
                        <span>{estrelas} ({media.toFixed(1)})</span>
                        <span className="text-sm text-gray-600">
                            {comentarios.length} comentário(s)
                        </span>
                    </p>
                    <div className="flex gap-3 mt-4">
                        <button onClick={() => setModalAberta(true)}
                            className="mt-3 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700">
                            Avaliar
                        </button>

                        <button
                            onClick={() => setListaAberta(true)}
                            className="mt-3 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            Ver Comentários
                        </button>

                        <button
                            onClick={() => {
                                const novoFavoritoEstado = !filme.favorito
                                fetch(`http://localhost:3000/filmes/${filme.id}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ favorito: novoFavoritoEstado })
                                })
                                .then(() => atualizarFilme(filme.id, filme.comentarios, novoFavoritoEstado))
                            }}
                            className={`mt-3 px-4 py-2 rounded-lg ${filme.favorito 
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                                : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                        >
                            {filme.favorito ? '⭐ Favorito' : '☆ Adicionar aos Favoritos'}
                        </button>
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
        </>
    )
}

export default CardFilme