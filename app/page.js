'use client'

import axios from "axios"
import CreatePost from "./components/AddPosts"
import { useQuery } from "@tanstack/react-query"
import Post from "./components/Post"
import { motion } from "framer-motion"

// Fetch all posts
const allPosts = async() =>{
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {
  const {data, error, isLoading} = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return error
  if (isLoading) return <div className="flex justify-center items-center h-80"> <h1 className="font-bold">Loading</h1> <h1 className="animate-bounce">.</h1><h1 className="animate-bounce">.</h1> <h1 className="animate-bounce">.</h1></div>
  console.log(data)
  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          key={post.id}
        >
          <Post key={post.id} id={post.id} comments={post.Comment} avatar={post.user.image} name={post.user.name} postTitle={post.title} likes={post.likes}/>
        </motion.div>
      ))}
    </main>
  )
}