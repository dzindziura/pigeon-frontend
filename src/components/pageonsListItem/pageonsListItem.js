import './pageonsListItem.scss';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
export const PageonsListItem = (props) => {
    const [vision, setVision] = useState(false);
    const {urlPhoto, year, number, onDelete} = props;
    const {REACT_APP_URL} = process.env;
    const styles = {
        marginLeft: 20,
        display: vision ? 'block' : 'none'
    }
    const onMouseEnter = () => {
        setVision(true);
    }
    const onMouseLeave = () => {
        setVision(false);
    }
    return (
            <div className='grid-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div>
                    <div><img width="auto" height="200" src={`${REACT_APP_URL}uploads/${urlPhoto}`} alt='pageon'/></div>
                    <div>{year}</div>
                    <div>{number}</div>
                    <div style={{display: 'flex'}}><Button style={styles} className='delete' variant="danger" onClick={() => onDelete()}>Delete</Button>
                    <Button style={styles} className='edit' variant="success">Edit</Button></div>
                </div>
            </div>
    );
}

export const PageonsListItemForAnotherUser = (props) => {
    const {urlPhoto, year, number} = props;
    const {REACT_APP_URL} = process.env;

    return (
            <div className='grid-item'>
                <div>
                    <div><img width="auto" height="200" className='img_pageon' src={`${REACT_APP_URL}uploads/${urlPhoto}`} alt='pageon'/></div>
                    <div>{year}</div>
                    <div>{number}</div>
                </div>
            </div>
    );
}