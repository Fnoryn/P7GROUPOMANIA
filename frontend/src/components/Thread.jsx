import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Post from "./Post/Post";
import { isEmpty } from "./utils/Utils";
import style from '../style/thread.css';
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
        <div className="listPost" style={style}>
            <ul>
                {!isEmpty(posts[0]) && 
                    posts.map((post) => {
                        return <Post post={post} key={post._id} />;
                    })}
            </ul>
        </div>
    );
};

export default Thread;