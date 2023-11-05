import { Product } from "../../interfaces/products"
import ProductCard from "../ProductCard/Index";

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
                <ProductCard key={item.id} item={item} handlerSubmit={handlerSubmit}/>
              )
            }
            )
          }
        </section>
)

}