import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../style/navbar.css';
import logo from '../assets/icon-left-font-monochrome-black.svg'
import { useSelector } from 'react-redux';
import Logout from './Logout';

function CollapsibleExample() {
  const userData = useSelector((state) => state.userReducer);
  return (
    <Navbar collapseOnSelect expand="lg" style={style} className='main-nav'>
      <Container>
        <Navbar.Brand className='logo' href="/home"> <img className='img-logo' src={logo} alt="groupomania logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            
          <NavDropdown className='pseudo-nav' title={userData.pseudo} id="collasible-nav-dropdown">
            <Logout />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;