import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useEffect } from "react"
import Swal from 'sweetalert2'

function Inclusao() {
  const { register, handleSubmit, reset, setFocus } = useForm()

  async function cadastraDestino(data) {
    const titulo = data.titulo
    const genero = data.genero
    const ano = data.ano
    const plataforma = data.plataforma
    const duracao = data.duracao
    const sinopse = data.sinopse
    const imagem = data.imagem

    try {
      const resposta = await fetch("http://localhost:3000/destinos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo, genero, ano, plataforma, duracao, sinopse, imagem, comentarios: [], favorito: false
        })
      })
      if (!resposta.ok) throw new Error("Erro ao incluir o destino")
      const novoDestino = await resposta.json()
      Swal.fire({
        title: "Destino cadastrado!",
        text: `Destino registrado com o código: ${novoDestino.id}`,
        icon: "success"
      });
    } catch (erro) {
      console.log(`Erro: ${erro.message}`)
    }
    reset()
  }

  useEffect(() => {
    setFocus("titulo")
  }, [])

  return (
    <>
      <Titulo />

      <div className="max-w-4xl mx-auto p-4">
        <div className="shadow-2xl rounded-3xl border border-slate-700 bg-slate-950 p-6 text-slate-100">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">Novo Destino</h2>

          <form className="space-y-5" 
            onSubmit={handleSubmit(cadastraDestino)} >
            <div>
              <label htmlFor="titulo" className="block text-sm font-semibold mb-1">Nome do Destino:</label>
              <input type="text" id="titulo" required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register("titulo")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="genero" className="block text-sm font-semibold mb-1">Tipo de viagem:</label>
                <input type="text" id="genero" required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  {...register("genero")} />
              </div>

              <div>
                <label htmlFor="ano" className="block text-sm font-semibold mb-1">Melhor época:</label>
                <input type="text" id="ano" required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  {...register("ano")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="plataforma" className="block text-sm font-semibold mb-1">Companhia aérea:</label>
                <input type="text" id="plataforma" required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  {...register("plataforma")} />
              </div>

              <div>
                <label htmlFor="duracao" className="block text-sm font-semibold mb-1">Duração (dias):</label>
                <input type="number" id="duracao" required
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  {...register("duracao")} />
              </div>
            </div>

            <div>
              <label htmlFor="sinopse" className="block text-sm font-semibold mb-1">Descrição do destino:</label>
              <textarea id="sinopse" required rows={4}
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register("sinopse")}
              ></textarea>
            </div>

            <div>
              <label htmlFor="imagem" className="block text-sm font-semibold mb-1">URL da imagem do destino:</label>
              <input type="url" id="imagem" required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register("imagem")} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input type="submit" value="Cadastrar"
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm p-3 rounded-3xl cursor-pointer transition"/>
              <input type="reset" value="Limpar"
                className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold text-sm p-3 rounded-3xl cursor-pointer transition"/>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Inclusao

