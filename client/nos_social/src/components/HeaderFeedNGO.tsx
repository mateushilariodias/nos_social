import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { UserContext } from "@/context/userContext";
import { IUser } from "@/interfaces";

function Header() {

    const { user, setUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)
    const [search, setSearch] = useState<string | null>(null)
    const [searchResults, setSearchResults] =  useState(false)
    const router = useRouter()
    
    const mutation = useMutation({
        mutationFn: async () => {
            return await makeRequest.post("auth/logout").then((res) => {
                res.data;
            });
        },
        onSuccess: () => {
            setUser(undefined);
            localStorage.removeItem("nos-social:user");
            router.push("/loginUser");
        },
    });

    const { data, error } = useQuery({
        queryKey: ['search'],
        queryFn: () => makeRequest.get(`search/search-users?params=${search}`).then((res) => {
            return res.data
        }),
        enabled: !!search
    })

    if (error) {
        console.log(error)
    }

    return (
        <header className="fixed z-10 w-full bg-white flex justify-between items-center py-4 px-72 shadow-sm">
            <Link href="homepage" className="font-bold text-sky-600 text-2xl">Nós Social</Link>
            <div className="flex bg-zinc-100 items-center text-gray-600 py-1 px-3 rounded-full relative" onClick={() => setSearchResults(true)} onMouseLeave={() => setSearchResults(false)}>
                <input className="bg-zinc-100 focus-visible:outline-none py-2 px-4" type="text" name="search" id="search" placeholder="Pesquisar" value={search ? search : ""} onChange={(e) => setSearch(e.target.value)} />
                <FaSearch />
            </div>
            {search && searchResults && (
                <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-0 left-0 top-[100%]">
                    {data?.map((users:IUser, id:number) => {
                        return (
                            <Link href={"/profile?id="+users.id} key={id} className="flex items-center gap-2" onClick={() => (setSearch(null), setSearchResults(false))}>
                                <img src={users.userImg ? users.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" className="w-8 h-8 rounded-full" />
                                <span className="font-bold">{users.userName}</span>
                            </Link>
                        )
                    })}
                    <Link href={"/search?params="+search} className="font-semibold border-t border-zinc-300 text-center pt-2" onClick={() => (setSearch(null), setSearchResults(false))}>Ver todos os resultados.</Link>
                </div>
            )}
            <div className="flex gap-5 items-center text-gray-600">
                {/* <div className="flex gap-3">
                    <button type="button" title="Pesquisar" className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full">
                        <TbMessageCircle2Filled />
                    </button>
                    <button type="button" title="Notificações" className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full">
                        <FaBell />
                    </button>
                </div> */}
                <div className="relative" onMouseLeave={() => setShowMenu(false)}>
                    <button className="flex gap-2 items-center" onClick={() => setShowMenu(!showMenu)}>
                        <img className="w-8 h-8 rounded-full" src={user ? user.userImg : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                        <span className="font-bold">{user?.userName}</span>
                    </button>
                    {showMenu && (
                        <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap right-[-8px]">
                            <Link href="profile" className="border-b">Perfil da ONG</Link>
                            <Link href="feedUser" className="border-b">Entrar como usuário comum</Link>
                            <Link href="" onClick={() => mutation.mutate()}>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
export default Header;