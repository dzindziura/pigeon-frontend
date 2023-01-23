import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import './navbar.scss'

export const Navigation = (props) => {
  const [showNavRight, setShowNavRight] = useState(false);
  const [login, setLogin] = useState('');

  useEffect(() => {
    if(localStorage.token !== ''){
        setLogin('Log out')
      }else{
        setLogin('Log in')
      }
  }, [])

  const logOut = () => {
    console.log('hi')
    localStorage.token = '';
    props.setToken('');
    console.log(localStorage.token)
  }
  return (
  <>
  <nav class="navbar">
            <ul>
                <li><Link to="/">Мої</Link></li>
                <li><Link to="/list">Інші</Link></li>
                <li><Link to="/info">Інфо</Link></li>
                <li><Link to="/chat">Чат</Link></li>
                <li><button onClick={logOut}>Вийти</button></li>
            </ul>
        </nav>
  </>
  );
}