import { Product } from "../../interfaces/products"

interface ProductsListProps {
    productsPerPage: () => Product[];
    handlerSubmit: (item :Product) => (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function  ProductsList ({productsPerPage, handlerSubmit}: ProductsListProps) {
return(
    <section className="products">
          {
            productsPerPage() && productsPerPage().map((item) => {
              return (
                <article className="list" key={item.id}>
                  <img height={200}  loading="lazy" src="https://flowbite.com/docs/images/products/apple-watch.png" alt={item.name} />
                    <h3>{item.name}</h3>
                  <section className="description-product">
                    <p> <strong>${item.unit_price}</strong></p>
                    <p>Category: <strong>{item.type}</strong></p>
                  </section>
                   {item.stock == 0 ? <p className="out-stock">🚨 Out of stock</p> : <p>Stock: <strong>{item.stock}</strong></p>} 
                  <section>
                    <form onSubmit={handlerSubmit(item)}>
                     <input 
                     name="quantity"
                     type="number" 
                     defaultValue={1}
                     />
                    <button type="submit">Add to Cart</button>
                    </form>
                  </section>
                </article>
              )
            }
            )
          }
        </section>
)

}