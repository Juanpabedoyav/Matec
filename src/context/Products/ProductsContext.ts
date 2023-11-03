import { createContext } from 'react';
import { ProductState } from "./ProductsProvider";

export const ProductContext =  createContext( {} as ProductState);