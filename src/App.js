import instance from './axios.js';
import React,{ useState, useEffect } from 'react';
import { Login } from './components/login/login.js'
import axios from 'axios';
import { Pageons } from './components/pageons/pageons.js';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navigation } from './components/navbar/navbar.js'
import { InfoAboutUser } from './components/infoAboutUser/infoAboutUser.js';
import { ListAllUsers } from './components/listAllUsers/listAllUsers.js';
import { Chat } from './components/chat/chat.js'
import './index.css'
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');

const App = () => {
  const {REACT_APP_URL} = process.env;
  const [pageonsInfo, setPageonsInfo] = useState([]);
  const [infoAboutUser, setInfoAboutUser] = useState([]);
  const [name, setName] = useState(localStorage.name);
  const [email, setEmail] = useState(localStorage.email);
  const [avatar, setAvatar] = useState(localStorage.avatar);
  const [createdAt, setCreatedAt] = useState(localStorage.createdAt);
  const [loginInfo, setLoginInfo] = useState(false);
  const [token, setToken] = useState('');
  const [id, setId] = useState(localStorage.id);

  const login = async (data) => {

    await axios.post(`${REACT_APP_URL}auth/login`, data)
    .then(response => {
      if(response.status === 200){
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('id', response.data._id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('createdAt', response.data.createdAt);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('updatedAt', response.data.updatedAt);
        localStorage.setItem('avatar', response.data.avatar);
      }
      setToken(response.data.token);
      getAllData();
      setName(response.data.name)
      setEmail(response.data.email)
      setCreatedAt(response.data.createdAt)
      setAvatar(response.data.avatar)
      setId(response.data._id)

    });
    //sends the username and socket ID to the Node.js server
    
  }
  const setInfoAboutUserData = async() => {
    const data = await {id: localStorage.id, name: localStorage.name, token: localStorage.token, createdAt: localStorage.createdAt, email: localStorage.email, updatedAt: localStorage.updatedAt};
    console.log(data)
    await setInfoAboutUser(infoAboutUser => ({
      ...infoAboutUser, ...data
    }));
  }
  // useEffect(() => {
  //   socket.emit('newUser', { name, socketID: socket.id });
  // })
  useEffect(()=>{
    if(id){
      socket.emit("newUser", id);
    }
   },[id]);
  useEffect(() => {
    setInfoAboutUserData();
    setToken(localStorage.token);
    console.log('use Effect')
    getAllData();
  }, [])

  const registration = async(data) => {
    await axios.post(`${REACT_APP_URL}auth/register`, data)
    .then(response => {
      if(response.status === 200){
        setToken(response.data.token)
        setInfoAboutUser(response.data)
        setLoginInfo(true)
      }
    });
  }

  const getAllData = async () => {
    const userId = localStorage.id;
    await axios.get(`${REACT_APP_URL}api/posts/getAll/:${userId}`)
    .then(response => {
      setPageonsInfo(response.data.data)
    })
  }

  const addNewPageon = async (data) => {
    const result = [...pageonsInfo];
    axios.post(`http://localhost:4000/posts/add`, data).then((res) => {
    result.push(res.data.data)
    setPageonsInfo(result);
  }).catch((err) => console.log(err))
    
  }

  const deletPageon = async (id) => {
    await axios.delete(`${REACT_APP_URL}post/${id}`)
    .then(response => {
      console.log(response);
    })
    getAllData();
  }

  const View = () => {
    if(token !== ''){
      return (
        <>
        <Navigation setToken={setToken} />
        <Routes>
          <Route path="/" element={<Pageons data={pageonsInfo} setData={addNewPageon} token={token} onDelete={deletPageon} />}></Route>
          <Route path='/info' element={<InfoAboutUser avatar={avatar} name={name} email={email} createdAt={createdAt}/>}></Route>
          <Route path='/list' element={<ListAllUsers/>}></Route>
          <Route path='/chat' element={<Chat socket={socket}/>}></Route>
        </Routes>
        </>
      )
    }else{
      return (
        <Login login={login} socket={socket} registration={registration}/>
      )

    }
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <View />
        </div>
      </div>
    </>
  );
}

export default App;
