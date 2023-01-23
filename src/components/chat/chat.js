import './chat.scss'
import { Aside } from './component/aside';
import { Body } from './component/body';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'

export const Chat = ({socket}) => {
    const { REACT_APP_URL } = process.env;
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    useEffect(() => {
      socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);


    useEffect(() => {
        getUsers();
    }, [])
    const [ messageLog, setMessageLog ] = useState();
    const [ messageToUserId, setMessageToUserId ] = useState(null);
    const [ listUser, setListUser ] = useState(null);
    const [ sendTo, setSendTo ] = useState(null);
    const getUsers = async (id) => {
        await axios.get(`${REACT_APP_URL}getUser`)
        .then(response => {
            setListUser(response.data);
        })
    }
    const sendMessage = (e) => {
        e.preventDefault();

        const newData = {
            message: e.target.message.value,
            id: localStorage.id,
            to: messageToUserId,
            sender: localStorage.name
        }

        axios.post(`${REACT_APP_URL}api/sendMessage`, newData).then((res) => {
            // console.log(res.data.data);
            setMessageLog(messageLog => [...messageLog, res.data.message]);
            socket.emit('send-msg', res.data.message);
            setSendTo(res.data.message.sender);
        })
        e.target.message.value = '';
    }
    useEffect(() => {
        if (socket) {
          socket.on("msg-recieved", (msg) => {
            setArrivalMessage({
              fromSelf: false,
              message: msg,
              messageTo: {
                _id: localStorage.id,
                name: sendTo
              },
              user: {
                _id: messageToUserId,
                name: sendTo
              },
              createdAt: `${year}-${month<10?`0${month}`:`${month}`}-${date}`
            });
            console.log(messageToUserId)
          })
        }
      }, []);
      useEffect(()=>{
        arrivalMessage && setMessageLog((prev)=>[...prev,arrivalMessage]);
      },[arrivalMessage]);
    if(listUser === null) {
        return(
            <h1>Loading</h1>
        )
    }
    const getId = async (id) => {
        setMessageToUserId(id)
        axios.get(`${REACT_APP_URL}api/getMessage/${localStorage.id}/${id}`).then((res) => {
            setMessageLog(res.data.data);
            setMessages(res.data.data)
            console.log(res.data.data)
        })
    }
    return (
        <div id="container">
            <Aside socket={socket} users={listUser} getId={getId}/>
            <main>
                {messageToUserId === null ? '' : <Body message={messageLog}/>}
                <footer className={messageToUserId === null ? 'd-none' : 'd-block'}>
                    <form onSubmit={sendMessage}>
                        <textarea placeholder="Type your message" name="message"></textarea>
                        <div className="grid grid-cols-12">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
                            <button type="submit" className="col-start-12 text-right">Send</button>
                        </div>
                    </form>
                </footer>
            </main>
        </div>
    )
}