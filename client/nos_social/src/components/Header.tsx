import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa"
import { TbMessageCircle2Filled } from "react-icons/tb"

function Header() {

    const [user, setUser] = useState({userName:'', userImg:''})

    useEffect(() => {
        let value = localStorage.getItem("nos-social: user")
        if(value){
            setUser(JSON.parse(value));
        }
    },[] )

    return (
        <header>
            <Link href='/'>Nós Social</Link>
            <div>
                <input type="text" name="search" id="search" />
                <FaSearch />
            </div>
            <div>
                <div>
                    <button>
                        <TbMessageCircle2Filled />
                    </button>
                    <button>
                        <FaBell />
                    </button>
                </div>
                <div>
                    <img src={user.userImg.length > 0 ? user.userImg: "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="Imagem do perfil" />
                    <span>{user.userName}</span>
                </div>
            </div>
        </header>
    )
}
export default Header;