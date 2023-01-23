import React, { useState } from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './infoAboutUser.scss'
import axios from 'axios'

export const InfoAboutUser = (props) => {
    const {REACT_APP_URL} = process.env;
    const { name, email, createdAt, avatar } = props;
    const [ newAvatar, setNewAvatar ] = useState(avatar);
    const getFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', e.target.avatar.files[0]);
        formData.append('email', email)
        
        axios.post(`${REACT_APP_URL}api/setNewAvatar`, formData).then((res) => {
            setNewAvatar(res.data.url)
            localStorage.setItem('avatar', res.data.url);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="mt-5">
            <div>
                <form class="flex items-center space-x-6" onSubmit={getFile}>
                    <div class="shrink-0">
                        <img className="h-44 w-44 object-cover rounded-full imginfoAboutUser" alt="avatar" src={newAvatar} />
                    </div>
                    <label class="block">
                        <span class="sr-only">Choose profile photo</span>
                        <input type="file" name="avatar" class="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "/>
                    </label>
                    <input className="rounded-full bg-sky-500 p-2 hover:bg-sky-700" type="submit" value="Зберегти" />
                </form>
            </div>
            <Row>
                <Col>
                    <div className="mt-5"><b>{name}</b></div>
                    <div>{email}</div>
                </Col>
            </Row>
            <h5 className="mt-5">Personal data</h5>
            <div>Date of account creation: {createdAt.slice(0, 10)}</div>
        </div>
    )
}