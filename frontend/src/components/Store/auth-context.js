import {createContext} from 'react'

const AuthContext = createContext({
    inventory: [],
    addInventory: ()=>{},
    editInventory: ()=>{},
    deleteInventory: ()=>{}
});

export default AuthContext;