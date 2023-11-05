import { useContext, useRef, useState } from "react"
import './App.css'
import { ShoppingContext } from "./context/Shopping/ShoppingContext"
import { Product } from "./interfaces/products"
import { ProductContext } from "./context/Products/ProductsContext"
import NavBar from "./components/NavBar"
import Pagination from "./components/Pagination"
import ProductsList from "./components/ProductsList"
import Shopping from "./components/Shopping"
import useSeo from "./hooks/useSeo"


function App() {
//context shopping cart
const {addProduct,  state} = useContext(ShoppingContext)
//context products
const {products} = useContext(ProductContext)
//SEO
useSeo({
  title: `Shopping Cart (${state.isOpenOrder ? 'Open Order' : 'Close Order'})`,
  description: 'Shopping Cart Alternova Shop'
})
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
  if(currentPage > 1)
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
//filter products by input search
const filterProducts = !input
? []
: products.filter((item) =>
 item.name.toLowerCase().includes(input.toLocaleLowerCase())
  );
return (
    <main>
      <NavBar filter={filter} filterByType={filterByType}/>
       <input className="search-products" onChange={handleSearch} placeholder='Search your product ...' />
      <Pagination products={products} productsPerPage={productsPerPage} backPage={backPage} nextPage={nextPage} />
      
      <section className="layaout">
        {
          filterProducts.length > 0 && input.length > 0 ?
          <ProductsList 
          productsPerPage={() => filterProducts} 
          handlerSubmit={handlerSubmit}
        />:
          <ProductsList 
            productsPerPage={filterType.length > 0 ? () => filterType : productsPerPage} 
            handlerSubmit={handlerSubmit}
          />
        }
        
          <Shopping totalCart={totalCart} state={state} downloadJSON={downloadJSON} totalOrder={totalOrder}/>
      </section>
    </main>
  )
}

export default App