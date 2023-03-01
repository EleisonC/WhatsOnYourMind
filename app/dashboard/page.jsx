import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import MyPosts from "./MyPosts"


export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session){
        redirect('/api/auth/signin')
    }
    return(
        <main className="pt-6">
            <h1 className="text-2xl font-bold">
                Welcome Back {session?.user?.name}
            </h1>
            <MyPosts />
        </main>
    )
}