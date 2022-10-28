import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsImageFill} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../style/postAdd.css';
import styleRendu from '../../style/postRendu.css'
import Navbar from '../Navbar';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import { isEmpty } from '../utils/Utils';
import { addPost, getPosts } from '../../actions/post.actions';


const  PostAdd = () =>{
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null)
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async() => {
    if (message || postPicture){
      const data = new FormData();
      data.append('posterId', userData._id);
      data.append('message', message);
      if (file) data.append("file", file);

      await dispatch(addPost(data));
      dispatch(getPosts());
      setMessage("");
      setPostPicture("");
      setFile("");
    } 
  }

  const handlePicture = (e) =>{
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    console.log("handlePicture");
    setFile(e.target.files[0]);
  }


  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData])

  return (
    <>    
    <Navbar />
    {isLoading ? (
      <div className='loader'>
          <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>

    ) : (
      <Card className='main-card' style={style}>
        <Card.Body className='upload-img'>              
            <Button className='btn-upload-img'>              
              <BsImageFill className='bs-img' />
              <Form.Control 
              type="file" 
              id="file-upload"
              name='file'
              accept=".jpg, .jepg, .png"
              onChange={(e) => handlePicture(e)}
              className='btnInput'       
              size="lg"
               />
              </Button>
        </Card.Body>
      <Card.Body className='username-card'>

    <Card.Body>
    <InputGroup>
        <InputGroup.Text>Text</InputGroup.Text>
        <Form.Control as="textarea" 
        aria-label="With textarea" 
        className='textarea-card' 
        name='message' 
        id='message'
        maxLength={500}
        placeholder='Text' 
        onChange={(e) => setMessage(e.target.value)} 
        value={message} 
        />
      </InputGroup>
    </Card.Body>
      </Card.Body>        
      <Card.Body className='card-publier'>
            <Button variant="primary" className='btn-publier send' onClick={handlePost} href='/home'>Publier</Button>
        </Card.Body>

    </Card>
    )
  }
        {message || postPicture ? (
          <Card className='card-rendu' style={styleRendu}>
              <Card.Header className='header-rendu' >
               Posté par : {userData.pseudo}
              </Card.Header>
              <Card.Body className='contenu-card-rendu'>
                  <Card.Body className='img-card-rendu'>
                      <Card.Img className='img-rendu' variant="top" src={postPicture} alt="pic posté"></Card.Img>
                  </Card.Body>
                  <Card.Body className='text-card-rendu'>
                    <Card.Text className='text-rendu'>
                      {message}
                    </Card.Text>
                  </Card.Body>
              </Card.Body>
              
          </Card>

        ): null}
    </>
  );
}

export default PostAdd;