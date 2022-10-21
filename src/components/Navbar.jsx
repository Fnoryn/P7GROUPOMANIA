import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from '../style/navbar.css';
import logo from '../assets/icon-left-font-monochrome-black.svg'
import {NavLink} from 'react-router-dom';


function CollapsibleExample() {

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
          <NavDropdown  title="UserName" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/add">Créer un post</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;