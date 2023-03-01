// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await prisma.post.findMany({
        include: {
            user: true,
            Comment: true,
            likes:true,
        },
        orderBy: {
            createdAt: "desc"
        }
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(403).json({err: "Error happened whilist fetching posts" })
    }
  }
}
