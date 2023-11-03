import { useState } from 'react';
import {  Product } from "../interfaces/products";


export interface ShoppingState {
  isOpenOrder: boolean,
    cart: Product[],

}
const INITIAL_STATE: ShoppingState = {
  isOpenOrder: true,
  cart: []
};
const useInitialState =() =>{

  const [state, setState] = useState(INITIAL_STATE);
  
  const addProduct = (payload: Product) =>{

    const productExist = state.cart.find((item) => item.id === payload.id);
    
    const newCart = productExist ? state.cart.map((item) => item.id === payload.id ? { ...item, quantity: item.quantity + 1, totalprice : item.quantity * item.unit_price} : item) : [...state.cart, { ...payload, quantity: 1 }];

    return setState({
        ...state,
        cart: newCart,
    });

      

  };


  const toogleOrder = () =>{
    setState({
      ...state,
      isOpenOrder: !state.isOpenOrder,
    });

  };

  return{
    state,
    addProduct,
    toogleOrder
  };

};


export default useInitialState;