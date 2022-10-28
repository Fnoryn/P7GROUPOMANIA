import Card from 'react-bootstrap/Card';
import style from '../../style/post.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/Utils';
import LikeBtn from './LikeBtn';
import { useState } from 'react';
import { BsFillChatLeftTextFill, BsFillPencilFill } from 'react-icons/bs';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import PostComments from './PostComments';


const Post = ({post}) => {
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const updateItem = () => {
    if(textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false);
  }

  return (
  <Card style={style} className="post" key={post._id} >
      <Card.Header className='header'>Posté par : 
          {
            !isEmpty(userData[0]) && 
            userData
              .map((user) => {
                if(user._id === post.posterId) return user.pseudo
                else return null
              })
          } 
          </Card.Header>
      <Card.Body className='main-post'>
        <Card.Body className='img-card'>
          <Card.Img variant="top" src={post.picture} alt="card-pic" className='img-post' />        
        </Card.Body>
        <Card.Body className='txt-post' >
          <Card.Text className='paragraph-post' >
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated === true &&  (
              <div className='update-post-txt'>
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value) }
                />
                <div className="button-container">
                  <button className="btn-update" onClick={updateItem} >
                    validé modification
                  </button>
                </div>
              </div>
            )
            }
          </Card.Text>
          {userData._id === post.posterId && (
            <div className='btn-to-update'>
              <div onClick={() => setIsUpdated(!isUpdated)}>
                <BsFillPencilFill/>
              </div>
              <div>
                <DeletePost id={post._id} />
              </div>
            </div>
          )}
        </Card.Body> 
      </Card.Body>
        <Card.Body className='like-post' >
        < BsFillChatLeftTextFill onClick={() => setShowComments(! showComments) } />
          {showComments && <PostComments post={post} /> }
          <LikeBtn post={post} />
        </Card.Body>
    </Card>
 
  );
}

export default Post;