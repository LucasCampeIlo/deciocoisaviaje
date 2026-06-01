import { useState, useEffect } from "react"
import { Titulo } from './components/Titulo'
import CardFilme from './components/CardFilme'

function Favoritos() {
    const [destinosFavoritos, setDestinosFavoritos] = useState([])

    useEffect(() => {
        async function carregarFavoritos() {
            const resposta = await fetch("http://localhost:3000/destinos")
            const dados = await resposta.json()
            const favoritos = dados.filter(destino => destino.favorito === true)
            setDestinosFavoritos(favoritos)
        }
        carregarFavoritos()
    }, [])

    function atualizarFilme(id, comentariosAtualizados, favoritoestado) {
        if (!favoritoestado) {
            const destinosFiltrados = destinosFavoritos.filter(destino => destino.id !== id)
            setDestinosFavoritos(destinosFiltrados)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Titulo />
            <div className="max-w-7xl mx-auto p-4">
                <h2 className="text-2xl my-2 p-3 font-bold">
                    {destinosFavoritos.length > 0
                        ? `Meus Destinos Favoritos (${destinosFavoritos.length})`
                        : 'Você não tem destinos favoritos ainda'}
                </h2>
                {destinosFavoritos.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-3">
                        {destinosFavoritos.map(destino => (
                            <CardFilme filme={destino} key={destino.id} atualizarFilme={atualizarFilme} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Favoritos







