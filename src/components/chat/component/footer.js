import axios from "axios";
import { useState } from "react";
export const Footer = ({ messageToUserId}) => {
    const {REACT_APP_URL} = process.env;
    const [ messageLog, setMessageLog ] = useState();
    const sendMessage = (e) => {
        e.preventDefault();
        const newData = {
            message: e.target.message.value,
            id: localStorage.id,
            to: messageToUserId
        }
        axios.post(`${REACT_APP_URL}api/sendMessage`, newData).then((res) => {
            console.log(res.data.data);
            setMessageLog(messageLog => [...messageLog, res.data.data]);
        })
        e.target.message.value = '';
    }
    return(
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
    )
}