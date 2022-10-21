import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsImageFill} from 'react-icons/bs';
import style from '../style/postAdd.css';
function PostAdd() {
  return (
    <Card className='main-card' style={style}>
        <Card.Body className='upload-img'>
            <Button className='btn-upload-img' ><BsImageFill className='bs-img'/></Button>
        </Card.Body>
      <Card.Body className='username-card'>
        <Card.Title>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="email" placeholder="Enter UserName" />
                </Form.Group>
            </Form>
        </Card.Title>
    <Card.Body>
    <InputGroup>
        <InputGroup.Text>Text</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" className='textarea-card' />
      </InputGroup>
    </Card.Body>

      </Card.Body>        
      <Card.Body className='card-publier'>
            <Button variant="primary" className='btn-publier' href='/list'>Publier</Button>
        </Card.Body>
    </Card>
  );
}

export default PostAdd;