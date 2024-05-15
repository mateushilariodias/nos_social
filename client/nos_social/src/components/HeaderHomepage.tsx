import { FiAlignJustify } from "react-icons/fi";
import Link from "next/link";

function Header() {

    return (
        <header className="fixed z-10 w-full bg-white flex justify-between items-center py-4 px-4 lg:px-72 shadow-sm">
            <Link className="font-bold text-sky-600 text-2xl" href='/'>Nós Social</Link>
            <div className="hidden lg:flex lg:gap-5 items-center text-gray-600">
                <Link href="/loginUser" className="bg-blue-600 hover:bg-blue-800 py-3 px-5 font-bold text-white rounded-lg">
                    <strong>Entrar como usuário</strong>
                </Link>
                <Link href="/registerUser" className="bg-blue-600 hover:bg-blue-800 py-3 px-5 font-bold text-white rounded-lg">
                    <strong>Cadastrar-se como usuário</strong>
                </Link>
            </div>
            <div className="flex lg:hidden pr-4">
                <FiAlignJustify />
            </div>
        </header>
    )
}
export default Header;