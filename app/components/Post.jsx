'use client'

import Image from "next/image"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, {AxiosError} from 'axios'
import { toast } from "react-hot-toast"
import LikeComponent from "./Like"

export default function Post({avatar, postTitle, name, id, comments, likes}) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image 
                className="rounded-full"
                alt="avatar"
                src={avatar}
                height={32}
                width={32}
                />
                <h3 className="font-bold text-gray-700">{ name }</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{postTitle}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                <Link href={`/post/${id}`}>
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length} Comments
                    </p>
                </Link>
                <LikeComponent likes={likes} id={id}/>
            </div>
        </div>
    )
}