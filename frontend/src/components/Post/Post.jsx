import Card from 'react-bootstrap/Card';
import style from '../../style/post.css'
import { useDispatch, useSelector } from 'react-redux';
import LikeBtn from './LikeBtn';
import { useState } from 'react';
import { BsFillChatLeftTextFill, BsFillPencilFill } from 'react-icons/bs';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import PostComments from './PostComments';
import CardImg from 'react-bootstrap/esm/CardImg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';


const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);  
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
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
 console.log(` img post = ${post.picture}`)
 console.log(` vérif isAdmin = ${userData.isAdmin}`)
 console.log(` users data pseudo = ${usersData.pseudo}`)
 console.log(`c quoi usersData._id : ${usersData._id}`)
  return (
<Card style={style} className="post" key={post._id} >
    <Card.Header className='header'>
      <Card.Title>Posté par : 
              {post.pseudo}
      </Card.Title>
    </Card.Header>
      <Card.Body className='main-post'>
        <Card.Body className='txt-post' >
          <Card.Body className='paragraph-post' >
            {isUpdated === false && <Card.Text className='text-post'> {post.message}</Card.Text>}
            {isUpdated === true &&  (
              <div className='update-post-txt'>
                <Form.Control
                  className='update-message'
                  as="textarea"
                  maxLength={180}
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value) }
                />
                <div className="button-container">
                  <Button className="btn-update" onClick={updateItem} >
                    validé modification
                  </Button>
                </div>
              </div>
            )
            }          
            <CardImg className="img-card" src={post.picture} alt="" />  
          </Card.Body>
          <Card.Body>
            {userData._id === post.posterId  && (
              <div className='btn-to-update'>
                  <div  onClick={() => setIsUpdated(!isUpdated)}>
                    <BsFillPencilFill/>

                    <DeletePost id={post._id} />
                  </div>
              </div>
            )}
            {userData.isAdmin === true && (
              <div>
                <DeletePost id={post._id} />
              </div>
            )}                  
            <LikeBtn post={post} />
          </Card.Body>               
          <Card.Footer>
            <Card.Body className='comm-post' >
                <BsFillChatLeftTextFill onClick={() => setShowComments(! showComments) } />
                {showComments && <PostComments post={post} /> }
            </Card.Body>
          </Card.Footer>
        </Card.Body> 
      </Card.Body>
</Card>
 
  );
}

export default Post;