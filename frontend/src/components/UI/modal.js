import {Modal, Button} from 'react-bootstrap';
import AuthContext from '../Store/auth-context';
import {useContext, useState} from 'react';

const DelModal = (props) => {
    const context = useContext(AuthContext);
    return (
        <>

      <Modal
        show={props.id?true:false}
        onHide={props.handleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Delete Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you Sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModal}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{context.deleteInventory(props.id)}}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DelModal;