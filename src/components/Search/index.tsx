import { ChangeEvent,  useContext,  useRef, useState } from 'react';
import { SearchResult } from "../SearchResult";
import { ProductContext } from "../../context/Products/ProductsContext";



export const Search = () => {
  const {products} = useContext(ProductContext)
  const debounceRef = useRef<NodeJS.Timeout>();
  const [input, setInput] = useState('');

  const filterProducts = !input
    ? []
    : products.filter((item) =>
     item.name.toLowerCase().includes(input.toLocaleLowerCase())
      );
 
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
        setInput(event.target.value);
        }, 500);
    };

  return (
    <section>
        <input onChange={handleSearch} placeholder='Search your product ...' />
        {filterProducts.length > 0  ? 
      <>
        <h2>Search Result</h2>
        <SearchResult products={filterProducts} /> 
      </>
        : <p>Product not found</p>}
    </section>
  );
};