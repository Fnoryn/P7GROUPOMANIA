import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { likePost, unlikePost } from '../../actions/post.actions'
import { UidContext } from '../AppContext'

const LikeBtn = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unLike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }
  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])
  return (
    <div>
      <span>{post.likers.length}</span>
      {uid === post?.posterId?._id ? (
        <Button variant="disable" disabled className="btn-like">
          <BsFillHandThumbsUpFill />
        </Button>
      ) : !post.likers.includes(uid) ? (
        <Button variant="secondary" className="btn-like" onClick={like}>
          <BsFillHandThumbsUpFill />
        </Button>
      ) : (
        <Button variant="primary" className="btn-unlike" onClick={unLike}>
          <BsFillHandThumbsUpFill />
        </Button>
      )}
    </div>
  )
}

export default LikeBtn
