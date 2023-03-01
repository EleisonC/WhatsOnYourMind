// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in to like" })

    const likeId = req.body

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    })

    try {
      const result = await prisma.likeComment.delete({
        where: {
            id: likeId
        }
      })
      res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(403).json({err: "Error happened whilist deleting Like" })
    }
  }
}
