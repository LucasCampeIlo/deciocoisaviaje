import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useState } from "react"
import CardFilme from "./components/CardFilme"

function Pesquisa() {
  const { register, handleSubmit } = useForm()
  const [filmes, setFilmes] = useState([])

  async function pesquisaFilmes(data) {
    try {
      const resposta = await fetch("http://localhost:3000/filmes")
      if (!resposta.ok) throw new Error("Erro ao consultar os filmes")
      const dados = await resposta.json()
      const dados2 = dados.filter(filme => (
        filme.titulo.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        filme.genero.toUpperCase().includes(data.pesquisa.toUpperCase())
      ))
      if (dados2.length == 0) {
        alert("Não há filmes com a palavra-chave no título ou gênero")
      } else {
        setFilmes(dados2)
      }
    } catch (erro) {
      console.log("Erro: ", erro.message)
    }
  }

  const listaFilmes = filmes.map(filme => (
    <CardFilme key={filme.id} filme={filme} />
  ))

  return (
    <>
      <Titulo />
      <h2 className="text-2xl my-2 p-3 font-bold">Pesquisa de Filmes</h2>
      <form className='text-center'
        onSubmit={handleSubmit(pesquisaFilmes)}>
        <input type="text" className='text-sm w-96 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-violet-200' required
          placeholder="Palavra chave do título ou gênero"
          {...register("pesquisa")} />
        <input type="submit" value="Pesquisar"
          className='p-3 border-0 text-white text-sm font-bold cursor-pointer rounded-lg bg-violet-700 ml-2' />
      </form>

      <section className='grid grid-cols-3 gap-x-5 gap-y-3 p-3'>
        {listaFilmes}
      </section>
    </>
  )
}

export default Pesquisa
