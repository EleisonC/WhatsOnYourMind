// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in to make a post" })

    const title = req.body.title

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    if (title?.length > 300){ 
      return res.status(403).json({ message: "Please write a shorter post" })}
    console.log(req.body.title)
    if (!title?.length){
      return res.status(403).json({ message: "Please do not leave it blank" })}

    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id
        }
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({err: "Error happened whilist making a post" })
    }
  }
}