'use client'
import { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



export default function LikeComponent({likes, id}){
    const [likedState, setLikedState] = useState()
    const [numLikes, setNumLikes] = useState()
    const [loadingState, setLoadingState] = useState(false)
    const queryClient = useQueryClient()
    const binarySearch = (arr, target) => {
        let start = 0
        let end =  arr?.length - 1
        while (start <= end) {
            if (arr[start].postId == target) {
                return arr[start]
            } else {
                start++
            }
            if (arr[end].postId == target) {
                return arr[end]
            } else {
                end--
            }
        }
    }

 
    useEffect(() => {
        setNumLikes(likes.length)
        const likedPost = binarySearch(likes, id)
        if (likedPost) {
          setLikedState(true);
        } else {
          setLikedState(false);
        }
      }, [likes, id]);

    const { mutate } = useMutation(async (pData) => {
        if(pData.callMethod === "post") {
            const likedPost = binarySearch(likes, id);
            likedPost ? null : await  axios.post("/api/likes/addLike", { data: pData.postId })
            likedPost ? null : setNumLikes(likes.length + 1)
            setLoadingState(true)
        } else {
            const likedPost = binarySearch(likes, id);
            likedPost ? await axios.delete("/api/likes/deleteLike", {data: {likedId:likedPost.id, postId: pData.postId} }) : console.log("*******_________-------______&&&&&&&")
            setLoadingState(true)
        }
    },{
        onError: (error) => {
            console.log(error)
            if (error instanceof AxiosError)
                toast.error(error?.response?.data.message)
            setLoadingState(false)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["posts"])
            queryClient.invalidateQueries(['auth-posts'])
            queryClient.invalidateQueries(['detail-post'])
            setLoadingState(false)
        }
    })


    const likePosts = async(e) => {
        e.preventDefault()
        if (!loadingState) {
            setLoadingState(true)
            // const likedPost = binarySearch(likes, id)
            const callMethod = likedState ?  "delete" : "post"
            if (callMethod == "delete") {
                setLikedState(false)
                setNumLikes(likes.length - 1)
            } else {
                setLikedState(true)
            }
            let pData = {
                postId: id,
                callMethod,
            }
            mutate(pData)
        }
    }


    return (
       <div className="flex items-center justify-center gap-2">
            { likedState ? (
                <svg onClick={(e) => likePosts(e)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            ) : (
                <svg onClick={(e) => likePosts(e)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

            )
            }
            <p className="text-sm font-bold text-gray-700">
                {(numLikes < 0) ? 0 : numLikes } Likes
            </p>
       </div>
    )
}