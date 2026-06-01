import { useEffect, useState } from "react"
import { Titulo } from "./components/Titulo"
import CardFilme from "./components/CardFilme"

function App() {
  const [destinos, setDestinos] = useState([])

  useEffect(() => {
    async function buscaDestinos() {
      const resposta = await fetch("http://localhost:3000/destinos")
      const dados = await resposta.json()
      setDestinos(dados)
    }
    buscaDestinos()
  }, [])

  function atualizarDestino(id, comentariosAtualizados, favoritoestado) {
    const destinosAtualizados = destinos.map(destino => {
      if (destino.id == id) {
        return {
          ...destino,
          comentarios: comentariosAtualizados,
          favorito: favoritoestado !== undefined ? favoritoestado : destino.favorito
        }
      }
      return destino
    })
    setDestinos(destinosAtualizados)
  }

  const listaDestinos = destinos.map(destino => (
    <CardFilme filme={destino} key={destino.id} atualizarFilme={atualizarDestino}/>
  ))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Titulo />

      <div className="max-w-7xl mx-auto p-4">
        <header className="mb-6 rounded-3xl bg-slate-900/80 border border-slate-700 p-6 shadow-xl shadow-cyan-950/20">
          <h2 className="text-3xl font-bold">Destinos em Destaque</h2>
          <p className="mt-2 text-slate-400">Encontre a sua próxima viagem com avaliações reais e opções das principais companhias aéreas.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listaDestinos}
        </div>
      </div>
    </div>
  )
}

export default App