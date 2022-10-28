import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Post from "./Post/Post";
import { isEmpty } from "./utils/Utils";
const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts())
            setLoadPost(false)
        }
    }, [loadPost, dispatch])


    return(
        <div className="tread-container">
            <u>
                {!isEmpty(posts[0]) && 
                    posts.map((post) => {
                        return <Post post={post} key={post._id} />;
                    })
                }
            </u>
        </div>
    )
}

export default Thread;