import { useForm } from "react-hook-form"
import { Titulo } from './components/Titulo'
import { useEffect } from "react"
import Swal from 'sweetalert2'

function Inclusao() {
  const { register, handleSubmit, reset, setFocus } = useForm()

  async function cadastraFilme(data) {
    const titulo = data.titulo
    const genero = data.genero
    const ano = data.ano
    const plataforma = data.plataforma
    const duracao = data.duracao
    const sinopse = data.sinopse
    const imagem = data.imagem

    try {
      const resposta = await fetch("http://localhost:3000/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo, genero, ano, plataforma, duracao, sinopse, imagem, comentarios: []
        })
      })
      if (!resposta.ok) throw new Error("Erro ao incluir o filme")
      const novoFilme = await resposta.json()
      Swal.fire({
        title: "Filme cadastrado!",
        text: `Ok! Filme cadastrado com o código: ${novoFilme.id}`,
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
        <div className="shadow-lg rounded-2xl p-6">

          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Inclusão de Filmes
          </h2>

          <form className="space-y-5" 
            onSubmit={handleSubmit(cadastraFilme)} >
            <div>
              <label htmlFor="titulo"
                className="block text-sm font-semibold mb-1">
                Título do Filme:
              </label>
              <input type="text" id="titulo" required
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                {...register("titulo")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="genero"
                  className="block text-sm font-semibold mb-1">
                  Gênero:
                </label>
                <input type="text" id="genero" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                  {...register("genero")} />
              </div>

              <div>
                <label htmlFor="ano"
                  className="block text-sm font-semibold mb-1">
                  Ano de Lanç.:
                </label>
                <input type="number" id="ano" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                  {...register("ano")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="plataforma"
                  className="block text-sm font-semibold mb-1">
                  Plataforma:
                </label>
                <input type="text" id="plataforma" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                  {...register("plataforma")} />
              </div>

              <div>
                <label htmlFor="duracao"
                  className="block text-sm font-semibold mb-1">
                  Duração (min):
                </label>
                <input type="number" id="duracao" required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                  {...register("duracao")} />
              </div>
            </div>

            <div>
              <label htmlFor="sinopse"
                className="block text-sm font-semibold mb-1">
                Sinopse:
              </label>
              <textarea id="sinopse" required rows={4}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm resize-none focus:outline-none focus:ring-4 focus:ring-violet-200"
                {...register("sinopse")}
              ></textarea>
            </div>

            <div>
              <label htmlFor="imagem"
                className="block text-sm font-semibold mb-1">
                URL da Capa do Filme:
              </label>
              <input type="url" id="imagem" required
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-4 focus:ring-violet-200"
                {...register("imagem")} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <input type="submit" value="Cadastrar"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm p-3 rounded-lg cursor-pointer transition"/>
              <input type="reset" value="Limpar"
                className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm p-3 rounded-lg cursor-pointer transition"/>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Inclusao

