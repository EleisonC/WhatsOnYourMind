 'use client'

 import Post from "@/app/components/Post"
 import { useQuery } from "@tanstack/react-query"
 import axios from "axios"
 import AddComment from "@/app/components/AddComments"
 import Image from "next/image"
 import { motion } from "framer-motion"
 import LikeCommentComponent from "@/app/components/LikeComment"


 const fetchDetails = async (slug) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
 }

 export default function PostDetail(url) {
    const {data, error, isLoading} = useQuery({
        queryKey: ["detail-post"],
        queryFn: () => fetchDetails(url.params.slug)
    })

    if (error) return error
    if (isLoading) return <div className="flex justify-center items-center h-80"> <h1 className="font-bold">Loading</h1> <h1 className="animate-bounce">.</h1><h1 className="animate-bounce">.</h1> <h1 className="animate-bounce">.</h1></div>

    return (
        <main>
            <Post 
                id={data.id}
                comments={data.Comment}
                avatar={data.user.image}
                name={data.user.name}
                postTitle={data.title}
                likes={data.likes}
            />
            <AddComment id={data?.id}/>
            {data?.Comment?.map((comment) => (
                <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ ease: "easeOut" }}
                className="my-6 bg-white p-8 rounded-md"
                key={comment.id}
                >
                <div className="flex items-center gap-2">
                    <Image
                    className="rounded-full"
                    width={24}
                    height={24}
                    src={comment.user?.image}
                    alt="avatar"
                    />
                    <h3 className="font-bold">{comment?.user?.name}</h3>
                    <h2 className="font-thin text-xs">{comment.createdAt}</h2>
                </div>
                <div className="py-4">{comment.message}</div>
                <LikeCommentComponent likes={comment.likes} id={comment.id}/>
                </motion.div>
            ))}
        </main>
    )
 }