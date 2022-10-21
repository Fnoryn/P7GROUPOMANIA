import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import posttest from '../assets/posttest.jpg'
import style from '../style/post.css'
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import React from 'react';

function Post() {
  return (
   
  <Card style={style} className="post" >
    <Button className='btn-post' href='/list'>
      <Card.Header className='header'>Posté par : userId </Card.Header>
      <Card.Body className='main-post'>
        <Card.Body className='img-card'>
          <Card.Img variant="top" src={posttest} className='img-post' />        
        </Card.Body>
        <Card.Body className='txt-post' >
          <Card.Text className='paragraph-post' >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
          </Card.Text>
        </Card.Body> 
      </Card.Body>
        <Card.Body className='like-post' >
          <Button variant="primary" className='btn-like'><BsFillHandThumbsUpFill/></Button>
        </Card.Body>  
        </Button>
      </Card>
 
  );
}

export default Post;