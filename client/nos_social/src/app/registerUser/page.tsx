function registerUser() {
    return (
        <main>
            <form action=""></form>
            <h1></h1>
            <div>
                <label htmlFor="name">Nome</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="userName">Nome de usuário</label>
                <input type="text" name="userName" id="userName" />
            </div>
            <div>
                <label htmlFor="emailUser">E-mail</label>
                <input type="email" name="emailUser" id="emailUser" />
            </div>
            <div>
                <label htmlFor="phoneNumberUser">Celular</label>
                <input type="tel" name="phoneNumberUser" id="phoneNumberUser" />
            </div>
            <div>
                <label htmlFor="passwordUser">Senha</label>
                <input type="password" name="passwordUser" id="passwordUser" />
            </div>
        </main>
    );
}
export default registerUser;