import Link from "next/link";

function LoginUser() {
    return (
        <main className="flex flex-col min-h-screen items-center justify-center">
            <form action="" className="flex flex-col bg-slate-200 py-10 px-10 rounded-2xl gap-5 text-gray-800">
                <h1 className="font-bold text-2xl">Login de usuário</h1>
                <div className="flex flex-col items-start justify-between">
                    <label htmlFor="emailUser">E-mail:</label>
                    <input type="email" name="emailUser" id="emailUser" className="border-gray-400 border-b w-full focus-visible:border-gray-600 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <div className="flex flex-col items-start justify-between">
                    <label htmlFor="passwordUser">Senha:</label>
                    <input type="password" name="passwordUser" id="passwordUser" className="border-gray-400 border-b w-full focus-visible:border-gray-600 focus-visible:border-b focus-visible:outline-none" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-800 py-2 font-bold text-white rounded-lg">
                    <strong>Entrar</strong>
                </button>
            </form>
        </main>
    )
}
export default LoginUser;