import {Link} from "react-router-dom"

function Header() {
    return (
        <div className="header">
            <Link to="/">
            <img src="https://i.imgur.com/USMGLoV.png" alt="logo" style={{ height: "100px" }}/> 
            </Link>
            <Link to="/decks" className="nav-link">Decks</Link>
            <Link to="/newdeck" className="nav-link">Add New Deck</Link>
        </div>
    )
}

export default Header

