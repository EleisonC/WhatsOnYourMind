// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) 
      return res.status(401).json({ message: "Please sign in" })

    try {
      const result = await prisma.user.findUnique({
        where: {
            email: session.user?.email,
        },
        include: {
            post: {
            orderBy: {
                createdAt: "desc",
            },
            include: {
                Comment: true,
                likes: true,
                }
            }
        },
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({err: "Error happened whilist fetching posts" })
    }
  }
}
