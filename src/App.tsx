import { useContext, useState } from "react"
import './App.css'
import { ShoppingContext } from "./context/Shopping/ShoppingContext"
import { Product } from "./interfaces/products"
import { Search } from "./components/Search"


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


function App() {

const {addProduct,  state, totalOrder} = useContext(ShoppingContext)

const  [filterType, setFilterType] = useState<Product[]>([])

const handleAddProduct = (item :Product, stock: number) =>()=> {
  if (stock !== 0 ) {
    addProduct(item)
    item.stock = stock - 1
    }
  }

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

const filterByType = (type: string )  => {
  const filter = INITIAL_ITEMS.products.filter((item) => item.type === type)
  setFilterType(filter)
  if(type === "All") {
    setFilterType(INITIAL_ITEMS.products)
  }
}
let filter = INITIAL_ITEMS.products.map((item) =>  item.type)
filter = [...new Set(filter)]

return (
    <main>
      <header>
        <nav>
        <h1>Alternova Shop</h1>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cart</a></li>
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