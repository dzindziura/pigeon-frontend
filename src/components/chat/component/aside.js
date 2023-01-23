import { useState, useEffect } from "react"

export const Aside = ({users, getId, socket}) => {

    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        console.log('sdfsdf')
      socket.on('newUser', (data) =>{
        // setUsersList(data)
        console.log(data)
      });
    }, [socket]);
    // console.log(socket.handshake.query)
    const [active, setActive] = useState(null)
    const goToMessage = (item) => {
        setActive(item)
        getId(item._id)
    }

    const list = users.map(item => {
            return (
                <li 
                  key={item._id}
                  onClick={() => goToMessage(item)}
                  className={`${active === item && 'active'}`}>
                <img src={item.avatar} width="50" alt=""/>
                <div>
                    <h2>{item.name}</h2>
                    <h3>{usersList.socketID}</h3>
                    <h3>
                        <span class="status orange"></span>
                        offline
                    </h3>
                </div>
            </li>
            )

    })
    
        return (
            <aside>
                <header>
                    <input type="text" placeholder="search" />
                </header>
                <ul>
                    {list}
                </ul>
            </aside>
        )

}