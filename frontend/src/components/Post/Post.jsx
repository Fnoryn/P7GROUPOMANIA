import Card from 'react-bootstrap/Card';
import style from '../../style/post.css'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/Utils';
import LikeBtn from './LikeBtn';
import { useState } from 'react';
import { BsFillChatLeftTextFill, BsFillPencilFill } from 'react-icons/bs';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import PostComments from './PostComments';
import CardImg from 'react-bootstrap/esm/CardImg';



const Post = ({post}) => {
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const updateItem = () => {
    if(textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false);
  }


 console.log(`post._id = ${post._id}`)
 console.log(`post.posterId = ${post.posterId}`)
 console.log(`user data id = ${userData._id}`) 
 console.log(` le pseudo est = ${userData.pseudo}`)
 console.log(` img post = ${post.Picture}`)
  return ( 
  <Card style={style} className="post" key={post._id} >
      <Card.Header className='header'>Posté par : 
      {!isEmpty(usersData[""]) &&
                    usersData
                      .map((user) => {
                        console.log(`user id = ${user._id}`)
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
          </Card.Header>
      <Card.Body className='main-post'>

        <Card.Body className='txt-post' >
          <Card.Body className='paragraph-post' >
            {isUpdated === false && <span>{post.message}</span>}
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
            <CardImg className="img-card" src={post.Picture}  alt="" />  
          </Card.Body>
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