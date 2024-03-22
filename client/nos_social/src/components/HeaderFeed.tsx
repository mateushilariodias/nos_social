import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa"
import { TbMessageCircle2Filled } from "react-icons/tb"

function Header() {

    const [user, setUser] = useState({ userName: '', userImg: '' })
    const [showMenu, setShowMenu] = useState(false)
    const router = useRouter()

    useEffect(() => {
        let value = localStorage.getItem("nos-social: user")
        if (value) {
            setUser(JSON.parse(value));
        }
    }, [])

    const logout = (e:any) => {
        e.preventDefault();
        localStorage.removeItem("nos-social:token");
        router.push("/loginUser");
    }

    return (
        <header className="w-full bg-white flex justify-between items-center py-4 px-72 shadow-sm">
            <Link href="homepage" className="font-bold text-sky-600 text-2xl">Nós Social</Link>
            <div className="flex bg-zinc-100 items-center text-gray-600 py-1 px-3 rounded-full">
                <input className="bg-zinc-100 focus-visible:outline-none py-2 px-4" type="text" name="search" id="search" placeholder="Pesquisar" />
                <FaSearch/>
            </div>
            <div className="flex gap-5 items-center text-gray-600">
                {/* <div className="flex gap-3">
                    <button type="button" title="Pesquisar" className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full">
                        <TbMessageCircle2Filled />
                    </button>
                    <button type="button" title="Notificações" className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full">
                        <FaBell />
                    </button>
                </div> */}
                <div className="relative" onMouseLeave={()=>setShowMenu(false)}>
                    <button className="flex gap-2 items-center" onClick={() => setShowMenu(!showMenu)}>
                        <img className="w-8 h-8 rounded-full" src={user.userImg.length > 0 ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                        <span className="font-bold">{user.userName}</span>
                    </button>
                    {showMenu && (
                        <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-8px]">
                            <Link href="userConfiguration" className="border-b">Configurações do perfil</Link>
                            <Link href="" onClick={(e)=>logout(e)}>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header;