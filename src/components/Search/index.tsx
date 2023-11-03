/* eslint-disable indent */
import { ChangeEvent,  useRef, useState } from 'react';
import { SearchResult } from "../SearchResult";
const INITIAL_ITEMS = {
    "products": [
      {
        "id": crypto.randomUUID(),
        "name": "iPhone 14 Pro Ma",
        "unit_price": 5000,
        "stock": 5,
        "type": "technology",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Timon Racing Carrera",
        "unit_price": 8000,
        "stock": 2,
        "type": "technology",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Control joystick inalámbrico",
        "unit_price": 1000,
        "stock": 1,
        "type": "technology",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Bicicicleta Roadmaster",
        "unit_price": 1800,
        "stock": 1,
        "type": "sport",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Bicicleta Todo Terreno",
        "unit_price": 200,
        "stock": 0,
        "type": "sport",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Balon De Futbol",
        "unit_price": 120,
        "stock": 6,
        "type": "sport",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Ducha Electrica",
        "unit_price": 120,
        "stock": 8,
        "type": "building",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Gabinete De Baño",
        "unit_price": 650,
        "stock": 10,
        "type": "building",
        "quantity":   1,
        "totalprice": null
      },
      {
        "id": crypto.randomUUID(),
        "name": "Mueble Sanitario",
        "unit_price": 900,
        "stock": 2,
        "type": "building",
        "quantity":   1,
        "totalprice": null
      }
      
    ]
  }


export const Search = () => {
    
  const debounceRef = useRef<number>();
  const [input, setInput] = useState('');

  const filterProducts = !input
    ? []
    : INITIAL_ITEMS.products.filter((item) =>
     item.name.toLowerCase().includes(input.toLocaleLowerCase())
      );
 
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
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