import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from '../../style/postAdd.css';
import { isEmpty, timestampParser } from "../utils/Utils";
import { addPost, getPosts } from "../../actions/post.actions";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import { AiOutlineFileImage } from '@react-icons/all-files/ai/AiOutlineFileImage';
import CardImg from "react-bootstrap/esm/CardImg";
const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  
  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append("file", file);
      console.log(` handlePost data = ${data}`)
      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message")
    }
  };
 
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }; 

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };


  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    
  }, [userData, message]);

  return (
    <Card className="post-container-add" style={style}>
      {isLoading ? (
          <Spinner animation="grow" />
      ) : (
        <>
          <Card.Body className="post-form-add">
            <Card.Body className="post-add">
              <Card.Header className="cardHeader">
                <Card.Title className="cardTitle">
                  {userData.pseudo}
                </Card.Title>
                <Form.Control
                    as="textarea"
                    name="message"
                    id="message"
                    placeholder="Text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    maxLength={180}
                    style={{ height: '100px' }}
                  />
              </Card.Header>
            {message || postPicture ? (
              <Card className="card-container">
                <Card.Body className="cardPost">
                  <Card.Header className="cardHeader">
                    <Card.Title className="cardTitle">
                      {userData.pseudo}
                    </Card.Title>
                    <Card.Title className="timeStamp">{timestampParser(Date.now())}</Card.Title>
                  </Card.Header>
                    <Card.Text className="content">{message}</Card.Text>
                    <CardImg className="cardImg" src={postPicture}  alt="" />
                </Card.Body>
              </Card>
            ) : null}
            <Card.Footer className="footer-form">
              <div className="icon">
                  <>
                    <AiOutlineFileImage className="icon-img-upload" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture ? (
                  <Button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </Button>
                ) : null}
                <Button className="send" onClick={handlePost}>
                  Envoyer
                </Button>
              </div>
            </Card.Footer>
            </Card.Body>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default NewPostForm;