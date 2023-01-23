
import Row from 'react-bootstrap/Row';
import './pageons.scss'
import { PageonsListItem, PageonsListItemForAnotherUser } from '../pageonsListItem/pageonsListItem';
import { ModalAddNewPageons } from '../modal/ModalAddNewPageons/modalAddNewPageons';

export const Pageons = ({data, setData, onDelete}) => {
    const list = data.map(item => {
        const {_id, ...itemProps} = item;
        return <PageonsListItem 
            key={_id} 
            {...itemProps}
            onDelete={() => onDelete(_id)}
            /> 
    })
    return (
        <>
            <div className="mb-5">Count: {data.length}</div>
            <ModalAddNewPageons data={data} setData={setData}/>
            <div className='grid-container'>
                {list}
            </div>
        </>      
    );
}
export const PageonsForAnotherUser = ({data, setData}) => {
    const list = data.map(item => {
        const {_id, ...itemProps} = item;
        return <PageonsListItemForAnotherUser 
            key={_id} 
            {...itemProps}
            /> 
    })
    return (
        <>
            <div className="mb-5">Count: {data.length}</div>
            <div className='grid-container'>
                {list}
            </div>
        </>      
    );
}