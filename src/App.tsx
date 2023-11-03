import './App.css'


const INITIAL_ITEMS = {
  "products": [
    {
      "id": crypto.randomUUID(),
      "name": "iPhone 14 Pro Ma",
      "unit_price": 5000,
      "stock": 5,
      "type": "technology"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Timon Racing Carrera",
      "unit_price": 8000,
      "stock": 2,
      "type": "technology"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Control joystick inalámbrico",
      "unit_price": 1000,
      "stock": 1,
      "type": "technology"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Bicicicleta Roadmaster",
      "unit_price": 1800,
      "stock": 1,
      "type": "sport"
    },
    {
      "name": "Bicicleta Todo Terreno",
      "unit_price": 200,
      "stock": 0,
      "type": "sport"
    },
    {
      "name": "Balon De Futbol",
      "unit_price": 120,
      "stock": 6,
      "type": "sport"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Ducha Electrica",
      "unit_price": 120,
      "stock": 8,
      "type": "building"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Gabinete De Baño",
      "unit_price": 650,
      "stock": 10,
      "type": "building"
    },
    {
      "id": crypto.randomUUID(),
      "name": "Mueble Sanitario",
      "unit_price": 900,
      "stock": 2,
      "type": "building"
    }
    
  ]
}


function App() {

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
      <div className="x">
         <section className="products">
        {
          INITIAL_ITEMS.products.map((item) => {
            return (
              <article id="list" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.unit_price}</p>
                <p>{item.type}</p>
                <section>
                  <p>Stock: {item.stock}</p>
                  <button>Add to Cart</button>
                </section>
              </article>
            )
          }
          )
        }
      </section>
        <aside>
          <h2>Cart</h2>
        </aside>
      </div>
    </main>
  )
}

export default App
