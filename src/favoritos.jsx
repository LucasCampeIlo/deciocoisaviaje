import { useState, useEffect } from "react"
import { Titulo } from './components/Titulo'
import CardFilme from './components/CardFilme'

function Favoritos() {
    const [filmesFavoritos, setFilmesFavoritos] = useState([])

    useEffect(() => {
        // Recuperar filmes favoritos do localStorage
        async function carregarFavoritos() {
            const resposta = await fetch("http://localhost:3000/filmes")
            const dados = await resposta.json()
            
            // Filtrar apenas os filmes marcados como favoritos
            const favoritos = dados.filter(filme => filme.favorito === true)
            setFilmesFavoritos(favoritos)
        }
        carregarFavoritos()
    }, [])

    function atualizarFilme(id, comentariosAtualizados, favoritoestado) {
        if (!favoritoestado) {
            // Se foi removido dos favoritos, atualizar a lista
            const filmesFiltrados = filmesFavoritos.filter(filme => filme.id !== id)
            setFilmesFavoritos(filmesFiltrados)
        }
    }

    return (
        <div>
            <Titulo />
            <h2 className="text-2xl my-2 p-3 font-bold">
                {filmesFavoritos.length > 0 
                    ? `Meus Favoritos (${filmesFavoritos.length})` 
                    : 'Você não tem filmes favoritos ainda'}
            </h2>
            {filmesFavoritos.length > 0 && (
                <div className="grid grid-cols md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-3 p-3">
                    {filmesFavoritos.map(filme => (
                        <CardFilme filme={filme} key={filme.id} atualizarFilme={atualizarFilme} />
                    ))}
                </div>
            )}
        </div>
    )
}
export default Favoritos







