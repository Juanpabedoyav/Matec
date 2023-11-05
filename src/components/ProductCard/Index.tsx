import { Product } from "../../interfaces/products"

interface ProductCardProps {
    item: Product;
    handlerSubmit: (item :Product) => (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function  ProductCard ({item, handlerSubmit}: ProductCardProps) {
    return(
        <article className="list" key={item.id}>
                <img height={200}  loading="lazy" src="https://flowbite.com/docs/images/products/apple-watch.png" alt={item.name} />
                <h3>{item.name}</h3>
            <section className="description-product">
                <p>Category: <strong>{item.type}</strong></p>
                <p> <strong className="unit-price">${item.unit_price}</strong></p>
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
