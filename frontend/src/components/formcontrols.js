import {Container, Form, Button} from 'react-bootstrap';
import FormInput from './UI/form-input';
import {useState, useContext, useEffect} from 'react';
import AuthContext from './Store/auth-context';
import {useHistory, useParams} from 'react-router-dom';
import Wrapper from './UI/wrapper';

const FormControls = () => {
    const context = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const history = useHistory();
    let {inv_id} = useParams();

    useEffect(()=>{
        if(inv_id) {
            const invIndex = context.inventory.findIndex((val) => +val.id === +inv_id);

            const inventory_data = context.inventory[+invIndex];

            setName(inventory_data.name);
            setDesc(inventory_data.description);
            setPrice(inventory_data.price);
            setAuthor(inventory_data.author);
            setImageUrl(inventory_data.imageUrl);

        }
    },[inv_id])


    const handleSubmit = (e) => {
        e.preventDefault();      
        
        let url = 'http://localhost:5000/saveInventory';
        let method = 'POST';

        if(inv_id) {
            url="http://localhost:5000/editInventory";
            method  = 'PATCH'
        }

        let id = (inv_id) ? inv_id :context.inventory.length + 1

        const saveInventory = (async() => {
            const saveApi = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    name,
                    description,
                    price,
                    author,
                    imageUrl
                })
            });

            const response = await saveApi.json();

            if(!response.ok) {
                throw new Error("Failed to save")
            }

            if(inv_id) {
                context.editInventory(response.Inventory)
            } else {
                context.addInventory({
                    id: context.inventory.length + 1,
                    name,
                    description,
                    price,
                    author,
                    imageUrl
                });
            }
            
            history.push('/')
        });

        saveInventory();

    }

    const nameHandler = (e) => {setName(e.target.value)}

    const priceHandler = (e) => {setPrice(e.target.value)}

    const descriptionHandler = (e) => {setDesc(e.target.value)}

    const authorHandler = (e) => {setAuthor(e.target.value)}

    const imageURLHandler = (e) => {setImageUrl(e.target.value)}

    let valid = false;
    
    if(name && name.length !== 0 &&
        description && description.length !== 0 &&
        price && price.match(/[^0-9]+/) === null &&
        author && author.length !== 0 &&
        imageUrl && imageUrl.length !== 0) {
            valid = true
    }

    return (
        <Wrapper>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormInput
                        id={"exampleForm.ControlInput1"}
                        label={"Name"}
                        type={"text"}
                        value={name}
                        name={"name"}
                        onChange={nameHandler}
                        isValid={valid}
                    />

                    <FormInput          
                        id={"exampleForm.ControlInput2"}
                        label={"Price"}
                        type={"text"}
                        value={price}
                        name={"price"}
                        onChange={priceHandler}
                        isValid={valid}
                    />

                    <FormInput
                        id={"exampleForm.ControlInput3"}
                        label={"Description"}
                        type="text"
                        value={description}
                        name="description"
                        onChange={descriptionHandler}
                        isValid={valid}
                    />

                    <FormInput
                        id={"exampleForm.ControlInput4"}
                        label={"Author"}
                        type="text"
                        value={author}
                        name="author"
                        onChange={authorHandler}
                        isValid={valid}
                    />
                    
                    <FormInput
                        id={"exampleForm.ControlInput5"}
                        label={"ImageUrl"}
                        type="text"
                        value={imageUrl}
                        name="imageurl"
                        onChange={imageURLHandler}
                        isValid={valid}
                    />                    

                    <Button variant="primary" type="submit" disabled={!valid} onSubmit={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </Wrapper>
    )
}

export default FormControls