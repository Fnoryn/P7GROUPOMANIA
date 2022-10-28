import axios from 'axios';
import cookie from 'js-cookie'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


function HandleLogout (){

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, {expires: 1 });
    }
  };
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return(
    <Nav>
            <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                    Logout
        </NavDropdown.Item>
    </Nav>
  )

}
export default HandleLogout;