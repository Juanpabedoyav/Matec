import { Product } from "../../interfaces/products";

interface ShoppingProps {
    totalCart: number;
    totalOrder: number;
    state: {
        cart: Product[];
    };
    downloadJSON: () => void;
  }

export default function  Shopping ({totalCart, state, totalOrder,  downloadJSON }: ShoppingProps) {
    return(
      <aside>
          <h2>Cart  <strong className="total-cart">{totalCart}</strong></h2>
          
          <section className="products-cart">
        {
          state?.cart.length === 0  ? <p>Cart is empty</p> : 
          state?.cart && state.cart.map((item) => {
            return (
              <article className="list-cart" key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: <strong>x{item.quantity}</strong></p>
                <p>Unit Price: <strong>${item.unit_price}</strong></p>
                <p>Total Price: <strong>${item.totalprice}</strong></p>
              </article>
            )
          }
          )
        }
      </section>
          <section className="generate-ticket">
            <p>Total Order Price: <strong>${totalOrder}</strong></p>
            <button onClick={downloadJSON}>Create Order</button>
          </section>
        </aside>
    )
}
