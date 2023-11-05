import { Product } from "../../interfaces/products";

interface PaginationProps {
    products: Product[],
    productsPerPage: () => Product[],
    backPage: () => void,
    nextPage: () => void,

}
export default function  Pagination ({products, productsPerPage, backPage, nextPage}: PaginationProps) {
return (
        <section className="pagination">
          <p>Products: <strong>{productsPerPage().length}</strong> of <strong>{products.length}</strong></p>
          <article className="pagination-buttons">
            <button className="preview preview-pagination" onClick={backPage}>Preview</button>
            <button className="next next-pagination" onClick={nextPage}>Next</button>
          </article>
        </section>
    )

}