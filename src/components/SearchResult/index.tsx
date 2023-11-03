import { useContext } from "react";
import { ShoppingContext } from "../../context/Shopping/ShoppingContext";
import { Product } from "../../interfaces/products";

interface SearchResultProps {
  products: Product[];
}

export const SearchResult = ({ products }: SearchResultProps) => {
    const {addProduct} = useContext(ShoppingContext)
    const handleAddProduct = (item :Product, stock: number) => {
        if (stock !== 0 ) {
          addProduct(item)
          item.stock = stock - 1
          }
        }
  return (
        <section className="products">
          {
            products.map((item) => {
              return (
                <article id="list" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.unit_price}</p>
                  <p>{item.type}</p>
                  <section>
                    {item.stock == 0 ? <p>Out of stock</p> : <p>Stock: {item.stock}</p>} 
                    <button onClick = { () => handleAddProduct(item, item.stock)}>Add to Cart</button>
                  </section>
                </article>
              )
            
            }
            )
          }
        </section>
  );
};