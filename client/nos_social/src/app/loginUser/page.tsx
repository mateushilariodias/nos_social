function LoginUser() {
    return (
        <main className="flex min-h-screen flex-col itens-center justify-center">
            <form action="" className="flex flex-col">
                <h1></h1>
                <div>
                    <label htmlFor="emailUser">E-mail:</label>
                    <input type="email" name="emailUser" id="emailUser" />
                </div>
                <div>
                    <label htmlFor="passwordUser">Senha:</label>
                    <input type="password" name="passwordUser" id="passwordUser" />
                </div>
            </form>
        </main>
    )
}
export default LoginUser;