'use client'

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import EditPost from "./EditPost"

const fetchAuthPosts = async () => {
    const response = await axios.get("/api/posts/authPosts")
    return response.data
}

export default function MyPosts() {
    const { data, isLoading } = useQuery({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"],
    })
    if (isLoading) return <div className="flex justify-center items-center h-80"> <h1 className="font-bold">Loading</h1> <h1 className="animate-bounce">.</h1><h1 className="animate-bounce">.</h1> <h1 className="animate-bounce">.</h1></div>
    return (
        <div>
            {data?.post?.map((post) => (
                <EditPost 
                    id={post.id}
                    key={post.Id}
                    avatar={data.image}
                    name={data.name}
                    title={post.title}
                    comments={post.Comment}/> ))}
        </div>
    )
}

