'use client'


import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { toast } from "react-hot-toast"
import Link from "next/link"


export default function EditPost({avatar,name, title, comments, id}){
    const [toggle, setToggle] = useState(false)
    let deleteToastId = ""
    const queryClient = useQueryClient()
    const {mutate} = useMutation(
        async (id) => await axios.delete("/api/posts/deletePost", { data: id }),
        {
            onError: (error) => {
                console.log(error)
                toast.error("Error deleting that post", { id: deleteToastId })
            },
            onSuccess: (data) => {
                toast.success("Post has been deleted.", { id: deleteToastId })
                queryClient.invalidateQueries(['auth-posts'])
                console.log(data)
            }
        }
    )

    const deletePost = () => {
        deleteToastId = toast.loading("Deleting your post", { id: deleteToastId })
        mutate(id)
    }
    return (
        <>
        <div className=" bg-white my-8 p-8 rounded-lg">
            <div className="flex gap-4 items-center">
                <Image 
                    className="rounded-full"
                    alt="avatar"
                    src={avatar}
                    height={32}
                    width={32}
                />
                <h3 className="font-bold text-gray-700 underline">{name}</h3>
            </div>
            <div className="my-8 flex items-center">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length} Comments
                    </p>
                </Link>
                <button
                    onClick={(e) => setToggle(true)}
                    className="text-sm font-bold text-red-500">
                    Delete
                </button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
        </>
    )
}