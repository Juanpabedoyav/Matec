import { useContext, useState } from "react"
import './App.css'
import { ShoppingContext } from "./context/Shopping/ShoppingContext"
import { Product } from "./interfaces/products"
import { Search } from "./components/Search"
import { ProductContext } from "./context/Products/ProductsContext"


function App() {
//context shopping cart
const {addProduct,  state} = useContext(ShoppingContext)
//context products
const {products} = useContext(ProductContext)
//filter by type state
const  [filterType, setFilterType] = useState<Product[]>([])
const  [currentPage, setCurrentPage] = useState(1)

const productsPerPage = () => {
  return products?.slice(currentPage, currentPage+ 5);
}

const nextPage = () => {
  if(products.length > currentPage + 5)
  setCurrentPage(currentPage + 5)
}
const backPage = () => {
  if(currentPage > 0)
    setCurrentPage(currentPage - 5)
}

//add product to cart High Order Function
// const handleAddProduct = (item :Product, stock: number) =>()=> {
//   if (stock !== 0 ) {
//     addProduct(item)
//     item.stock = stock - item.quantity
//     }
//   }

const handlerSubmit = (item :Product) => (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const quantity = e.currentTarget.quantity.value
  const newItemCustomQuantity = {...item, quantity: Number(quantity)}
  if (item.stock !== 0 && quantity <= item.stock) {
    item.stock = item.stock - quantity
    addProduct(newItemCustomQuantity)
    }else{
      alert('Out of stock')
    }

 
} 
//download JSON funtion
const downloadJSON = () => {
  const clientProductDetail = state.cart.map((item) => {
    return {
      id: item.id,
      name: item.name,
      type: item.type,
      quantity: item.quantity,
      unit_price: item.unit_price,
      totalprice: item.totalprice,
    }
  })

  const fileStructure = {
    id: crypto.randomUUID(),
    products: clientProductDetail,
    totalOrder: totalOrder,
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
const filterByType = (type: string= 'ALL' )  => {
  const filter = products.filter((item) => item.type === type).slice(currentPage, currentPage+ 5);
  setFilterType(filter)
  setCurrentPage(0) 
 
}
//get filter type from JSON and remove duplicates
let filter = products && products.map((item) =>  item.type) 
filter = [...new Set(filter)]

const totalCart = state?.cart.reduce((acc, item) => acc + item.quantity, 0)
const totalOrder = state?.cart.reduce((acc, curr) => acc + curr.totalprice!, 0);

return (
    <main>
      <header>
        <nav>
        <h1>Alternova Shop</h1>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cart <strong>{totalCart}</strong></a></li>
          </ul>
        </nav>
      </header>
      <section className="filterBy">
        <p>Filter By:</p>
        <button onClick={() => filterByType('ALL')}>All</button>
        {
          filter.map((type) => {
            return (
              <button key={type} onClick={ () =>filterByType(type)}>{type}</button>
              )
            })
          }
      </section>
      <Search/>
      <button onClick={backPage}>Back</button>
      <button onClick={nextPage}>Next</button>
      <section className="x">
         <section className="products">
          {
           filterType.length === 0 ?
            productsPerPage() && productsPerPage().map((item) => {
              return (
                <article className="list" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>${item.unit_price}</p>
                  <p>{item.type}</p>
                  <section>
                    {item.stock == 0 ? <p>Out of stock</p> : <p>Stock: {item.stock}</p>} 
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
            ):
              filterType.map((item) => {
                return (
                  <article id="list" key={item.id}>
                    <h3>{item.name}</h3>
                    <p>${item.unit_price}</p>
                    <p>{item.type}</p>
                    <section>
                      {item.stock == 0 ? <p>Out of stock</p> : <p>Stock: {item.stock}</p>} 
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
        <aside>
          <h2>Cart</h2>
          <section className="products-cart">
        {
          state?.cart.length === 0  ? <p>Cart is empty</p> : 
          state?.cart && state.cart.map((item) => {
            return (
              <article className="list-cart" key={item.id}>
                <h3>{item.name}</h3>
                <p>Quantity: x{item.quantity}</p>
                <p>Unit Price: ${item.unit_price}</p>
                <p>Total Price:${item.totalprice}</p>
              </article>
            )
          }
          )
        }
      </section>
          <p>Total Order: ${totalOrder}</p>
          <button onClick={downloadJSON}>Total Order</button>
        </aside>
      </section>
    </main>
  )
}

export default App