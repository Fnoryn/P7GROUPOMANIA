import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeletePost = (props) => {
    const dispatch = useDispatch();
    const deleQuote = () => dispatch(deletePost(props.id))

    return(
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer ce post ?')){
                deleQuote();
            }
        }} >
            < BsTrashFill />
        </div>
    )
}

export default DeletePost