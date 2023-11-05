
interface NavBarProps {
    filter: string[],
    filterByType: (type: string) => void,
}
export default function  NavBar ({filter, filterByType}: NavBarProps) {
  return (
    <>
    <header className="header-navbar">
        <nav className="navbar">
        <h1>Alternova Shop</h1>
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
    </>
  )
}
