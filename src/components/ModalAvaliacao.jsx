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

        const novoComentario = {
            nome: data.nome,
            comentario: data.comentario,
            nota: Number(data.nota)
        }

        const comentariosAtuais = filme.comentarios || []

        const comentariosAtualizados = [
            ...comentariosAtuais,
            novoComentario
        ]

        const resposta = await fetch(
            `http://localhost:3000/destinos/${filme.id}`,
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
            atualizarFilme(filme.id, comentariosAtualizados)
            Swal.fire({
                title: "Avaliação enviada!",
                text: "Obrigado por compartilhar sua experiência de viagem.",
                icon: "success"
            });
            reset()
            fecharModal()
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-slate-950 w-[500px] rounded-3xl p-6 shadow-2xl shadow-cyan-950/40 border border-slate-700 text-slate-100">
                <h2 className="text-2xl font-bold mb-4">Avaliar Destino</h2>
                <p className="font-semibold text-lg mb-4 text-slate-300">{filme.titulo}</p>
                <form onSubmit={handleSubmit(enviaAvaliacao)}>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Nome</label>
                        <input
                            type="text"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            {...register("nome", {
                                required: "Informe o nome"
                            })}
                        />
                        {errors.nome &&
                            <p className="text-amber-300 text-sm">{errors.nome.message}</p>
                        }
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Comentário</label>
                        <textarea
                            rows="4"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            {...register("comentario", {
                                required: "Digite um comentário"
                            })}
                        />
                        {errors.comentario &&
                            <p className="text-amber-300 text-sm">{errors.comentario.message}</p>
                        }
                    </div>
                    <div className="mb-6">
                        <label className="block font-semibold mb-1">Nota</label>
                        <select
                            className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                            <p className="text-amber-300 text-sm">{errors.nota.message}</p>
                        }
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={fecharModal}
                            className="rounded-3xl bg-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-500"
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