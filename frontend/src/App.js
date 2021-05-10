import { useState, useEffect } from 'react';
import './App.css';
import Inventory from './components/inventory';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import BreadCrumbs from './components/UI/breadcrumb';
import {Route} from 'react-router-dom';
import Home from './components/home';
import AuthContext from './components/Store/auth-context';
import Spinners from './components/UI/spinners';
import FormControls from './components/formcontrols';
import { useLocation, Switch } from "react-router-dom";
import Wrapper from "./components/UI/wrapper";
import DelModal from "./components/UI/modal";

const App = () => {
  const [inventory, setInventry] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(()=>{
    const apiCall = async() => {
      const response = await fetch('http://localhost:5000/getinventory');    
      console.log(response)      

      const list = await response.json();   
      
      if(!response.ok) {
        throw new Error(response.message);
      }

      setInventry(list.Inventory);
    }

    apiCall();
    setLoader(false)

  }, [])

  const addInventory = (data) => {
    setInventry((prevState) => {
      return [...prevState , data]
    })
  }

  const editInventory = (data) => {
    setInventry(data)
  }

  const deleteInventory = (id) => {
    const apiCall = async() => {
      const response = await fetch('http://localhost:5000/deleteInventory', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Inv_id: id
        })
      });    

      const list = await response.json();   
      
      if(!response.ok) {
        throw new Error(response.message);
      }

      setInventry(list.Inventory);
      setModal(null);
    }

    apiCall();
  }

  const handleModal = () => {
    setModal(null);
  }

  const getIdFromModal = (id) => {
    setModal(id)
  }
  
  let content = inventory && inventory.length > 0 && inventory.map((val, i) => {
    return (
      <Row key={i}><Inventory key={val.id} data={val} getIdFromModal={getIdFromModal} /></Row>
    )
  })    
  
  if (!loader && inventory.length === 0) {
    content =  <div>No Items Found</div>
  }

 if(loader && inventory.length === 0) {
  content = <Spinners />
 } 

 content = <Wrapper>{content}{(modal!==null && <DelModal id={modal} handleModal={handleModal} />)}</Wrapper>
 

 return (
    <AuthContext.Provider value={{inventory, addInventory, editInventory, deleteInventory}}>
      <Switch>
        <Route path='/' exact>{content}</Route>
        <Route path='/add'><FormControls /></Route>
        <Route path='/edit/:inv_id'><FormControls /></Route>
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
