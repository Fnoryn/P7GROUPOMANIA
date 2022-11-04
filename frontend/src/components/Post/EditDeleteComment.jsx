import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BsFillPencilFill, BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({comment, postId}) => {
    const userData = useSelector((state) => state.userReducer);
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();
        if(text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    }

    const isAdmin = userData.isAdmin;

    const handleDelete = () =>  dispatch(deleteComment(postId, comment._id))

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId){
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId])

    return(
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <BsFillPencilFill/>
                </span>
            )}
            {isAuthor && edit && (
                <form onSubmit={handleEdit} className="edit-comment-form" >
                    <label htmlFor="text" onClick={() => setEdit(!edit)}><BsFillPencilFill/></label>
                    <br />
                    <input 
                    type="text" 
                    name="text" 
                    onChange={(e) => setText(e.target.value)} 
                    defaultValue={comment.text} 
                    />
                    <br />
                    <div>
                    <Button onClick={() => {
                        if (window.confirm("Voulez-vous supprimer ce commentaire ?")){
                            handleDelete();
                        }
                    }} >
                        <BsTrashFill/>
                    </Button>
                    <input type="submit" value="valider modification" />
                    </div>
                </form>
            )}
            {isAdmin === true && (
                <form onSubmit={handleEdit} className="edit-comment-form" >
                    <div>
                    <Button onClick={() => {
                        if (window.confirm("Voulez-vous supprimer ce commentaire ?")){
                            handleDelete();
                        }
                    }} >
                        <BsTrashFill/>
                    </Button>
                    </div>
                </form>               
            )}
        </div>
    )
}

export default EditDeleteComment;