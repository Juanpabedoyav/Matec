import { useState } from 'react';
import {  Product } from "../interfaces/products";


export interface ShoppingState {
  isOpenOrder: boolean,
    cart: Product[],
    totalOrder?: number,

}
const INITIAL_STATE: ShoppingState = {
  isOpenOrder: true,
  cart: [],
  totalOrder: 0,
};
const useInitialState =() =>{

  const [state, setState] = useState(INITIAL_STATE);
  
  const addProduct = (payload: Product) =>{
    const productExist = state.cart.find((item) => item.id === payload.id);
    const newCart = productExist  ? state.cart.map((item) => item.id === payload.id ? { ...item, quantity: item.quantity + 1, totalprice: (item.quantity + 1) * item.unit_price} : item) : [...state.cart, { ...payload, quantity: 1, totalprice: payload.unit_price }];
    return setState({
        ...state,
        cart: newCart,
    });
  };
  
  const totalOrder = () => state.cart.reduce((acc, curr) => acc + curr.totalprice!, 0);

  const toogleOrder = () =>{
    setState({
      ...state,
      isOpenOrder: !state.isOpenOrder,
    });

  };


  return{
    state,
    addProduct,
    totalOrder,
    toogleOrder
  };

};


export default useInitialState;