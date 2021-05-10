import { useContext } from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from './Store/auth-context';

const Inventory = (props) => {
    const context = useContext(AuthContext);

    return (
        <Card style={{ width: '50rem', marginBottom: '2rem', backgroundColor:'aliceblue' }}>
            <Card.Img variant="top" src={props.data.imageUrl} style={{width:'10rem', marginTop: '1rem'}} alt="NO IMAGE FOUND"/>
            <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.description}</Card.Text>
            <Card.Text>{props.data.price}</Card.Text>
            <Card.Text>{props.data.author}</Card.Text>            
            </Card.Body>
            <Card.Footer>
                <Link to={"/edit/"+props.data.id}><Button variant="primary">Edit</Button></Link>
                <Button variant="danger" style={{float: 'right'}} onClick={()=>{props.getIdFromModal(props.data.id)}}>Delete</Button>
            </Card.Footer>
        </Card>
    )
}

export default Inventory;