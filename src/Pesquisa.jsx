import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useState } from "react"
import CardFilme from "./components/CardFilme"

function Pesquisa() {
  const { register, handleSubmit } = useForm()
  const [destinos, setDestinos] = useState([])

  async function pesquisaDestinos(data) {
    try {
      const resposta = await fetch("http://localhost:3000/destinos")
      if (!resposta.ok) throw new Error("Erro ao consultar os destinos")
      const dados = await resposta.json()
      const dados2 = dados.filter(destino => (
        destino.destinos.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        destino.tipo.toUpperCase().includes(data.pesquisa.toUpperCase())
      ))
      if (dados2.length == 0) {
        alert("Não há destinos com essa palavra-chave no título ou categoria")
      } else {
        setDestinos(dados2)
      }
    } catch (erro) {
      console.log("Erro: ", erro.message)
    }
  }

  const listaDestinos = destinos.map(destino => (
    <CardFilme key={destino.id} filme={destino} />
  ))

  return (
    <>
      <Titulo />
      <h2 className="text-2xl my-2 p-3 font-bold">Pesquisa de Destinos</h2>
      <form className='text-center'
        onSubmit={handleSubmit(pesquisaDestinos)}>
        <input type="text" className='text-sm w-96 rounded-3xl p-3 border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-4 focus:ring-cyan-500' required
          placeholder="Cidade, tipo de destino ou companhia aérea"
          {...register("pesquisa")} />
        <input type="submit" value="Pesquisar"
          className='p-3 border-0 text-slate-950 text-sm font-bold cursor-pointer rounded-3xl bg-cyan-500 ml-2 hover:bg-cyan-400' />
      </form>

      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-3'>
        {listaDestinos}
      </section>
    </>
  )
}

export default Pesquisa
