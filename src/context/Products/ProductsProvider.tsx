import {  useLayoutEffect, useState } from 'react';
import { ProductContext } from "./ProductsContext";
import { Product, defaultProducts } from "../../interfaces/products";
import dataProducts from "../../data/data.json"

export interface ProductState  {
  products: Product[],
  total: number,
}

interface ProductProviderProps {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE :ProductState = {
  products: [],
  total: 0,
};



export const ProductProvider = ({children} : ProductProviderProps) => {

const products: defaultProducts[] = dataProducts.products
//clone products structure
const cloneProductsStructure : Product[] = products.map((product) => {
  return{
    ...product,
    id: crypto.randomUUID(),
    quantity: 1,
    totalprice: null
  }
})
  const  [state, setState] = useState(INITIAL_STATE);
  useLayoutEffect(() => {
    setState({
      products: cloneProductsStructure,
      total: cloneProductsStructure.length,
    });
  }, []);
  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
};