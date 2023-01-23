import './listAllUsers.scss'
import { List } from './list/list'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {PageonsForAnotherUser} from '../pageons/pageons'

export const ListAllUsers = (props) => {
  const {REACT_APP_URL} = process.env;
  const [fullPageData, setFullPageData] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/getUser').then(res => {
      setUsers(res.data)
      setLoading(false);
    });
  }, [])

  const ListMap = () => {
    const list = users.map(item => {
      return (
        <List data={item} key={item._id}  listAllUsers={ListAllUsers}/>
      )
    })
    return list
  }
  const ListAllUsers = async(id) => {
    await axios.get(`${REACT_APP_URL}api/posts/getAll/:${id}`)
    .then(response => {
      setFullPageData(response.data.data)
    })

    console.log(id)
  }
  if (loading === true) {
    console.log(users)
    return (
      <div>Loading...</div>
    )
  }
  if(fullPageData !== null) {
    return (
      <>
            <div><button onClick={() => setFullPageData(null)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Назад</button></div>
            <PageonsForAnotherUser data={fullPageData}> </PageonsForAnotherUser>

      </>
    )
  }
  return (
    <div>
      <table class="table-auto w-full">
        <col className='w-1/12'></col>
        <col className='w-auto'></col>
        <col className='w-auto'></col>
        <col className='w-auto'></col>
        <thead className='thead_list'>
          <tr>
            <th w-24></th>
            <th>Імя</th>
            <th>Статус</th>
            <th>Регіон</th>
          </tr>
        </thead>
        <tbody className='tbody_list'>
          {loading ? '' : <ListMap/>}
        </tbody>
      </table>
    </div>
  )
}