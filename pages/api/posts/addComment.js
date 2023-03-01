// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in" })

    const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email },
    })

    try {
      const {title, postId}= req.body.data
      if (title?.length > 300){ 
        return res.status(403).json({ message: "Please write a shorter comment" })}
  
      if (!title?.length){
        return res.status(403).json({ message: "Please do not leave it blank" })}

      const result = await prisma.comment.create({
        data: {
            message: title,
            userId: prismaUser?.id,
            postId,
        }
      })
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(403).json({err: "Error happened whilist Deleteing" })
    }
  }
}
