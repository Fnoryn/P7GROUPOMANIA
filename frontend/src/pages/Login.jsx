
import React from "react"
import style from '../style/auth.css'
import Button from 'react-bootstrap/Button';
import {useState} from 'react'
import axios from 'axios';

  
 function Auth () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [pseudo, setPseudo] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    if (password !== controlPassword ) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else{
            window.location='/home'
          }
        })
        .catch((err) => console.log(err));
    }
  };

    const [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    if (authMode === "signin") {
      return (
        <div className="Auth-form-container" style={style}>
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Pas de compte ?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email" >Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control mt-1"
                  placeholder="Email"
                />
              </div>
              <div className="email error"></div>
              <div className="form-group mt-3">
                <label htmlFor="password" >Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="form-control mt-1"
                  placeholder="Mot de passe"
                />
              </div>
              <div className="password error"></div>
              <div className="d-grid gap-2 mt-3">
                <Button type="submit" className="btn btn-primary" onClick={handleLogin}>
                  Connexion
                </Button>
              </div>
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container" style={style}>
           <form className="Auth-form" onSubmit={handleLogin} >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Déjà inscrit?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="pseudo" >Nom utilisateur</label>
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                className="form-control mt-1"
                placeholder="Nom utilisateur"
              />
            </div>
            <div className="pseudo error"></div>
            <div className="form-group mt-3">
              <label htmlFor="email" >Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control mt-1"
                placeholder="Email"
              />
            </div>
            <div className="email error"></div>
            <div className="form-group mt-3">
              <label htmlFor="password" >Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control mt-1"
                placeholder="Mot de passe"
              />
            </div>
            <div className="password error"></div>
            <div className="form-group mt-3">
            <label htmlFor="password-conf">Confirmer mot de passe</label>
          <input
            type="password"
            name="password"
            id="password-conf"
            placeholder="Confirmer mot de passe"
            onChange={(e) => setControlPassword(e.target.value)}
            className="form-control mt-1"
            value={controlPassword}
          />
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button type="submit" className="btn btn-primary" onClick={handleRegister}>
                Connexion
              </Button>
            </div>
          </div>
        </form>        
      </div>
    )
  }

export default Auth