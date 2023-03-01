// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in to like" })

    const postId = req.body.data || ''
    const commentId = req.body.commentId || ''

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    const preResult = await prisma.like.findFirst({
        where: {
            userId: prismaUser.id,
            postId,
        }
    })

    if (preResult) {
        return res.status(403).json({err: "Error Already Liked" })
    }

    try {
      const result = await prisma.like.create({
        data: {
          userId: prismaUser.id,
          postId,
        }
      })
      res.status(200).json(result)
    } catch (error) {
        console.log(error)
      res.status(403).json({err: "Error happened whilist making a post" })
    }
  }
}
