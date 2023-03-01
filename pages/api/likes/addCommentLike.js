// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in to like" })

    const commentId = req.body.data

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    try {
      const result = await prisma.likeComment.create({
        data: {
          userId: prismaUser.id,
          commentId,
        }
      })
      res.status(200).json(result)
    } catch (error) {
        console.log(error)
      res.status(403).json({err: "Error happened liking a comment" })
    }
  }
}
