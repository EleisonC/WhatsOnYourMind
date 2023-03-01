


export default async function handler(req, res) {
    if (req.method === "GET") {
    //   const session = await getServerSession(req, res, authOptions)
    //   if (!session) 
    //     return res.status(401).json({ message: "Please sign in" })
  
      try {
        console.log(req.query)
        const result = await prisma.post.findUnique({
          where: {
              id: req.query.details,
          },
          include: {
            user: true,
            likes: true,
            Comment: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                            user: true,
                            likes: true,
                     }
                
                },
            }
        })
        res.status(200).json(result)
      } catch (error) {
        console.log(error)
        res.status(403).json({err: "Error happened whilist fetching post" })
      }
    }
}