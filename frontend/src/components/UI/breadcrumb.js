import {Breadcrumb} from 'react-bootstrap';
import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const BreadCrumbs = () => {
    const [nav, setNav] = useState('');
    const location = useLocation();
    const history = useHistory();    

    const handleAddNav = (e) => {
        e.preventDefault();
        history.push('/add');
        setNav('add');
    }

    const handleHomeNav = (e) => {
        e.preventDefault();
        history.push('/');
        setNav('home');
    }
    
    const edit = location.pathname.includes('/edit/');
    const add = location.pathname.includes('/add');
    
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="#" onClick={handleHomeNav} active={!add && !edit && true}>Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#" onClick={handleAddNav} active={add && true}>Add New</Breadcrumb.Item>
            {location.pathname.includes('/edit/') &&<Breadcrumb.Item href="#" active={location.pathname.includes('/edit/')}>Edit</Breadcrumb.Item>}
        </Breadcrumb>
    )
}

export default BreadCrumbs;