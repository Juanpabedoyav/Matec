import { createContext } from 'react';
import {  Product } from "../../interfaces/products";

export interface ShoppingContextProps {
    state:{    
        isOpenOrder: boolean,
        cart: Product[],
    }
    addProduct: (payload: Product) => void,
    toogleOrder: () => void,
    
}

export const ShoppingContext = createContext({} as ShoppingContextProps);