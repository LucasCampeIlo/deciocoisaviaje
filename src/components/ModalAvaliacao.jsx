import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'

function ModalAvaliacao({ filme, fecharModal, atualizarFilme }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    async function enviaAvaliacao(data) {

        // cria o novo comentário
        const novoComentario = {
            nome: data.nome,
            comentario: data.comentario,
            nota: Number(data.nota)
        }

        // obtém os comentários já realizados (ou [])
        const comentariosAtuais = filme.comentarios

        // adiciona novo comentário
        const comentariosAtualizados = [
            ...comentariosAtuais,
            novoComentario
        ]

        // atualiza no JSON Server
        const resposta = await fetch(
            `http://localhost:3000/filmes/${filme.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comentarios: comentariosAtualizados
                })
            }
        )

        if (resposta.ok) {

            // atualiza lista na tela
            atualizarFilme(filme.id, comentariosAtualizados)
            Swal.fire({
                title: "Nigga!",
                text: "Good Job my nigga, my loved Nigga!",
                icon: "success"
            });
            reset()
            fecharModal()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-xl p-6 shadow-2xl">

                <h2 className="text-2xl font-bold mb-4">
                    Avaliar Filme
                </h2>

                <p className="font-semibold text-lg mb-4">
                    {filme.titulo}
                </p>

                <form onSubmit={handleSubmit(enviaAvaliacao)}>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">
                            Nome
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-2"
                            {...register("nome", {
                                required: "Informe o nome"
                            })}
                        />

                        {errors.nome &&
                            <p className="text-red-600 text-sm">
                                {errors.nome.message}
                            </p>
                        }
                    </div>

                    <div className="mb-4">
                        <label className="block font-semibold mb-1">
                            Comentário
                        </label>

                        <textarea
                            rows="4"
                            className="w-full border rounded-lg p-2"
                            {...register("comentario", {
                                required: "Digite um comentário"
                            })}
                        />

                        {errors.comentario &&
                            <p className="text-red-600 text-sm">
                                {errors.comentario.message}
                            </p>
                        }
                    </div>

                    <div className="mb-6">
                        <label className="block font-semibold mb-1">
                            Nota
                        </label>

                        <select
                            className="w-full border rounded-lg p-2"
                            {...register("nota", {
                                required: "Selecione a nota"
                            })}
                        >
                            <option value="">Selecione...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        {errors.nota &&
                            <p className="text-red-600 text-sm">
                                {errors.nota.message}
                            </p>
                        }
                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={fecharModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                        >
                            Enviar Avaliação
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default ModalAvaliacao