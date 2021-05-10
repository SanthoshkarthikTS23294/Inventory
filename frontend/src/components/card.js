import {Card, Button} from 'react-bootstrap';

const InventoryCard = (props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.description}</Card.Text>
            <Button variant="primary"></Button>
            </Card.Body>
        </Card>
    )
}

export default InventoryCard;