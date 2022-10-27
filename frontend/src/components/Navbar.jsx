import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../style/navbar.css';
import logo from '../assets/icon-left-font-monochrome-black.svg'
import {NavLink} from 'react-router-dom';
import { useContext } from 'react';
import { UidContext } from './AppContext';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function CollapsibleExample() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <Navbar collapseOnSelect expand="lg" style={style}>
      <Container>
        <Navbar.Brand className='logo' href=" "> <img className='img-logo' src={logo} alt="groupomania logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Container className='nav-lien'>
                <NavLink className={({isActive}) => (isActive ? "activeLink" : "unactive")} to="/home">Acceuil</NavLink>
                <NavLink className={({isActive}) => (isActive ? "activeLink" : "unactive")} to="/list">Publication</NavLink>
            </Container>
          </Nav>
          <Nav>
          <NavDropdown  title={userData.pseudo} id="collasible-nav-dropdown">
            <Logout />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;