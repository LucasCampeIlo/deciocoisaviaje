import { useEffect, useState } from "react"
import { Titulo } from "./components/Titulo"
import CardFilme from "./components/CardFilme"
import Favoritos from "./favoritos"

function App() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    async function buscaFilmes() {
      const resposta = await fetch("http://localhost:3000/filmes")
      const dados = await resposta.json()
      // console.log(dados)  
      setFilmes(dados)
    }
    buscaFilmes()
  }, [])

  function atualizarFilme(id, comentariosAtualizados, favoritoestado) {
    const filmesAtualizados = filmes.map(filme => {
      if (filme.id == id) {
        return {
          ...filme,
          comentarios: comentariosAtualizados,
          Favoritos: favoritoestado
        }
      }
      return filme
    })
    setFilmes(filmesAtualizados)
  }

  const listaFilmes = filmes.map(filme => (
    <CardFilme filme={filme} key={filme.id} atualizarFilme={atualizarFilme}/>
  ))

  return (
    <div>
      <Titulo />
      <h2 className="text-2xl my-2 p-3 font-bold">Lista dos Filmes Cadastrados</h2>
      <div className="grid grid-cols md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-3 p-3">
        {listaFilmes}
      </div>
    </div>
  )
}

export default App