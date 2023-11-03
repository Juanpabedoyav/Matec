import { useContext, useState } from "react"
import './App.css'
import { ShoppingContext } from "./context/Shopping/ShoppingContext"
import { Product } from "./interfaces/products"
import { Search } from "./components/Search"
import { ProductContext } from "./context/Products/ProductsContext"
// import dataProducts from "./data/data.json"


function App() {
//context shopping cart
const {addProduct,  state, totalOrder} = useContext(ShoppingContext)
//context products
const {products} = useContext(ProductContext)
//filter by type state
const  [filterType, setFilterType] = useState<Product[]>([])

//add product to cart High Order Function
const handleAddProduct = (item :Product, stock: number) =>()=> {
  if (stock !== 0 ) {
    addProduct(item)
    item.stock = stock - 1
    }
  }
//download JSON funtion
const downloadJSON = () => {
  const fileStructure = {
    products: state.cart,
    totalOrder: totalOrder(),
    totalProducts: state.cart.reduce((acc, item) => acc + item.quantity, 0),
  }

  const jsonString = JSON.stringify(fileStructure, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'datos.json';
  a.click();
  URL.revokeObjectURL(url);
};
//filter by type function
const filterByType = (type: string )  => {
  const filter = products.filter((item) => item.type === type)
  setFilterType(filter)
  if(type === "All") {
    setFilterType(products)
  }
}
//get filter type from JSON and remove duplicates
let filter = products.map((item) =>  item.type)
filter = [...new Set(filter)]

return (
    <main>
      <header>
        <nav>
        <h1>Alternova Shop</h1>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cart <strong>{state.cart.reduce((acc, curr) => acc + curr.quantity!, 0)}</strong></a></li>
          </ul>
        </nav>
      </header>
      <section className="filterBy">
        <p>Filter By:</p>
        <button onClick={() => filterByType('All')}>All</button>
        {
          filter.map((type) => {
            return (
              <button key={type} onClick={ () =>filterByType(type)}>{type}</button>
              )
            })
          }
      </section>
      <Search/>

      <section className="x">
         <section className="products">
          {
            filterType.length === 0 ?
            products.map((item) => {
              return (
                <article id="list" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.unit_price}</p>
                  <p>{item.type}</p>
                  <section>
                    {item.stock == 0 ? <p>Out of stock</p> : <p>Stock: {item.stock}</p>} 
                    <button onClick = { handleAddProduct(item, item.stock)}>Add to Cart</button>
                  </section>
                </article>
              )
            }
            ):
              filterType.map((item) => {
                return (
                  <article id="list" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>{item.unit_price}</p>
                    <p>{item.type}</p>
                    <section>
                      {item.stock == 0 ? <p>Out of stock</p> : <p>Stock: {item.stock}</p>} 
                      <button onClick = { handleAddProduct(item, item.stock)}>Add to Cart</button>
                    </section>
                  </article>
                )
              
              }
            )
          }
        </section>
        <aside>
          <h2>Cart</h2>
          <section className="products-cart">
        {
          state.cart.length === 0 ? <p>Cart is empty</p> : 
          state.cart.map((item) => {
            return (
              <article id="list-cart" key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unit_price}</p>
                <p>Total Price:{item.totalprice}</p>
              </article>
            )
          }
          )
        }
      </section>
          <p>Total Order: {totalOrder()}</p>
          <button onClick={downloadJSON}>Total Order</button>
        </aside>
      </section>
    </main>
  )
}

export default App