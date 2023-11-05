import { useContext, useRef, useState } from "react"
import './App.css'
import { ShoppingContext } from "./context/Shopping/ShoppingContext"
import { Product } from "./interfaces/products"
import { ProductContext } from "./context/Products/ProductsContext"


function App() {
//context shopping cart
const {addProduct,  state} = useContext(ShoppingContext)
//context products
const {products} = useContext(ProductContext)
//filter by type category
const  [filterType, setFilterType] = useState<Product[]>([])
//pagination
const  [currentPage, setCurrentPage] = useState(1)
//input search
const [input, setInput] = useState('');
//input search debounce
const debounceRef = useRef<NodeJS.Timeout>();
//products per page function
const productsPerPage = () => {
  return products?.slice(currentPage, currentPage+ 5);
}

//pagination function next and back
const nextPage = () => {
  if(products.length > currentPage + 5)
  setCurrentPage(currentPage + 5)
}
const backPage = () => {
  if(currentPage > 0)
    setCurrentPage(currentPage - 5)
}
//handler search function
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
    setInput(e.target.value);
    }, 500);
};
//handler submit function
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
const filterByType = (type: string )  => {
  const filter = products.filter((item) => item.type === type).slice(currentPage, currentPage+ 5);
  setFilterType(filter)
  setCurrentPage(0) 
 
}
//get filter type for nav from JSON and remove duplicates
let filter = products && products.map((item) =>  item.type).concat('All').reverse()
filter = [...new Set(filter)]

const totalCart = state?.cart.reduce((acc, item) => acc + item.quantity, 0)
const totalOrder = state?.cart.reduce((acc, curr) => acc + curr.totalprice!, 0);

const filterProducts = !input
? []
: products.filter((item) =>
 item.name.toLowerCase().includes(input.toLocaleLowerCase())
  );
console.log(filterProducts)
return (
    <main>
      <header>
        <nav className="navbar">
        <h1>Alternova Shop</h1>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Cart <strong>{totalCart}</strong></a></li>
          </ul>
        </nav>
      </header>
      <nav className="filter-by">
        {
          filter.map((type) => {
            return (
              <a className="filter-type" href={`#${type}`} key={type} onClick={ () =>filterByType(type)}>{type}</a>
              )
            })
          }
      </nav>
       <input className="search-products" onChange={handleSearch} placeholder='Search your product ...' />
        <section className="pagination">
          <p>Products: <strong>{productsPerPage().length}</strong> of <strong>{products.length}</strong></p>
          <article className="pagination-buttons">
            <button className="preview preview-pagination" onClick={backPage}>Preview</button>
            <button className="next next-pagination" onClick={nextPage}>Next</button>
          </article>
        </section>
      <section className="layaout">
         <section className="products">
          {
           filterType.length === 0 ?
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
            ):
            
            filterType.map((item) => {
                return (
                  <article className="list" key={item.id}>
                    <img height={200} loading="lazy"  src="https://flowbite.com/docs/images/products/apple-watch.png" alt={item.name} />
                      <h3>{item.name}</h3>
                    <section className="description-product">
                    <p><strong>${item.unit_price}</strong></p>
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
        <aside>
          <h2>Cart</h2>
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
            <p>Total Order: <strong>${totalOrder}</strong></p>
            <button onClick={downloadJSON}>Total Order</button>
          </section>
        </aside>
      </section>
    </main>
  )
}

export default App