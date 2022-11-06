import Card from 'react-bootstrap/Card'
import style from '../../style/post.css'
import { useDispatch, useSelector } from 'react-redux'
import LikeBtn from './LikeBtn'
import { useState } from 'react'
import { BsFillChatLeftTextFill, BsFillPencilFill } from 'react-icons/bs'
import { updatePost } from '../../actions/post.actions'
import DeletePost from './DeletePost'
import PostComments from './PostComments'
import CardImg from 'react-bootstrap/esm/CardImg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [textUpdate, setTextUpdate] = useState(null)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const path = process.env.REACT_APP_API_URL;
  
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
    }
    setIsUpdated(false)
  }

  return (
    <Card style={style} className="post" key={post._id}>
      <Card.Header className="header">
        <Card.Title>Posté par: {post?.posterId?.pseudo}</Card.Title>
      </Card.Header>
      <Card.Body className="main-post">
        <Card.Body className="txt-post">
          <Card.Body className="paragraph-post">
            {isUpdated === false && (
              <Card.Text className="text-post"> {post.message}</Card.Text>
            )}
            {isUpdated === true && (
              <div className="update-post-txt">
                <Form.Control
                  className="update-message"
                  as="textarea"
                  maxLength={180}
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <Button className="btn-update" onClick={updateItem}>
                    validé modification
                  </Button>
                </div>
              </div>
            )}
            <CardImg
              className="img-card"
              src={
                post.picture
                  ?`${path}public/${post.picture}` 
                  : null
              }
              alt=""
            />
          </Card.Body>
          <Card.Body>
            {userData._id === post.posterId._id && (
              <div className="btn-to-update">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <BsFillPencilFill />

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
            <Card.Body className="comm-post">
              <BsFillChatLeftTextFill
                onClick={() => setShowComments(!showComments)}
              />
              {showComments && <PostComments post={post} />}
            </Card.Body>
          </Card.Footer>
        </Card.Body>
      </Card.Body>
    </Card>
  )
}

export default Post
