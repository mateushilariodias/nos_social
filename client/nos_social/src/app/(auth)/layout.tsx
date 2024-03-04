function AuthPage({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col min-h-screen items-center justify-center">
            <form action="" className="flex flex-col bg-slate-200 py-10 px-10 rounded-2xl gap-5 text-gray-800 w-full lg:w-1/4">
                {children}
            </form>
        </main>
    );
}
export default AuthPage;