import BreadCrumbs from './breadcrumb';
import {Container} from 'react-bootstrap';

const Wrapper = (props) => {
    return (
        <Container>
          <BreadCrumbs />
        {props.children}
        </Container>
    )
}

export default Wrapper;