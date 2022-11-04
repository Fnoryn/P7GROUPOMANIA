import Card from 'react-bootstrap/Card';
import style from '../../style/post.css'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/Utils';
import LikeBtn from './LikeBtn';
import { useEffect, useState } from 'react';
import { BsFillChatLeftTextFill, BsFillPencilFill } from 'react-icons/bs';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import PostComments from './PostComments';
import CardImg from 'react-bootstrap/esm/CardImg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';


const Post = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);


 console.log(`post._id = ${post._id}`)
 console.log(`post.posterId = ${post.posterId}`)
 console.log(`user data id = ${userData._id}`) 
 console.log(` le pseudo est = ${userData.pseudo}`)
 console.log(` img post = ${post.picture}`)
 console.log(` vérif isAdmin = ${userData.isAdmin}`)
 console.log(`info sur userS = ${usersData._id}`)
  return (
<Card style={style} className="post" key={post._id} >
  {isLoading ? (
    
     <Spinner animation="border"> 
         {console.log(`isEmpty = ${isEmpty.value}`)}
     </Spinner>
  ): (
    <>
    {console.log(`isEmpty = ${isEmpty.value}`)}
    <Card.Header className='header'>
      {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        console.log("alo ?")
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
    </>
  )}
</Card>
 
  );
}

export default Post;