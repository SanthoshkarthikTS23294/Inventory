import {Form} from 'react-bootstrap';

const FormInput = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                isValid={props.isValid}
            />
        </Form.Group>
    )
}

export default FormInput;