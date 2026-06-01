import { Link } from 'react-router'

export function Titulo() {
    return (
        <>
            <div className="flex bg-violet-700 text-white p-3">
                <img src="./logo.png" alt="Logo de Filmes"
                    className="ml-2 mr-4 w-16 h-16" />
                <div>
                    <h1 className="text-3xl font-bold">Clube do Cinema do UniSenac</h1>
                    <h2 className="text-2xl italic">Sugestões e Avaliações de Filmes</h2>
                </div>
            </div>
            <nav className='text-right'>
                <Link to="/" className='px-6 py-3 bg-purple-900 text-white font-bold no-underline hover:underline hover:bg-purple-800 hover:text-amber-200'>Home</Link>&nbsp;&nbsp;
                <Link to="/inclusao" className='px-6 py-3 bg-purple-900 text-white font-bold no-underline hover:underline hover:bg-purple-800 hover:text-amber-200'>Inclusão</Link>&nbsp;&nbsp;
                <Link to="/pesquisa" className='px-6 py-3 bg-purple-900 text-white font-bold no-underline hover:underline hover:bg-purple-800 hover:text-amber-200'>Pesquisa</Link>&nbsp;&nbsp;
                <Link to="/favoritos" className='px-6 py-3 bg-yellow-600 text-white font-bold no-underline hover:underline hover:bg-yellow-700 hover:text-amber-200'>⭐ Favoritos</Link>&nbsp;&nbsp;
            </nav>
        </>
    )
}