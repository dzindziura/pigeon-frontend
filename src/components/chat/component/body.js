// export const Body = ({ message }) => {
//     if (message === null || message === undefined) {
//         return (
//             <h1>Loading... </h1>
//         )
//     }
//     const list = message.map(item => {
//         return (
//             <li class={item.user._id === localStorage.id || item.user === localStorage.id ? 'me' : 'you'}>
//                 <div class="entete">
//                     <span class="status green"></span>
//                     <h2>{item.user === localStorage.id ? item.messageTo.name : item.user.name || localStorage.name}</h2>
//                     <h3>{item.date}</h3>
//                 </div>
//                 <div class="message">
//                     {item.message}
//                 </div>
//             </li>
//         )
//     })
//     return (
//         <>
//             <ul id="chat">
//                 {list}
//             </ul>
//         </>

//     )
// }

export const Body = ({ message }) => {
    if (message === null || message === undefined) {
        return (
            <h1>Loading... </h1>
        )
    }
    const list = message.map(item => {
        console.log(item);
        let style = '';

        if(item.user._id === localStorage.id || item.user === localStorage.id){
            style = 'me'
        }else{
            style = 'you'
        }
        return (
            <li className={style}>
                <div class="entete">
                    <span class="status green"></span>
                    <h2>{item.user._id === localStorage.id ? 'Ви' : item.user.name || item.sender}</h2>
                    <h3 className="ml-2">{item.createdAt ? item.createdAt.slice(0, 10) : ''}</h3>
                </div>
                <div class="message">
                    {item.message}
                </div>
            </li>
        )
    })
    return (
        <>
            <ul id="chat">
                {list}
            </ul>
        </>

    )
}