import {Link} from "react-router-dom"

function Header() {
    return (
        <div className="header">
            <h1>Deck Swap</h1>
            <Link to="/decks">Decks</Link>
            <br />
            <Link to="/newdeck">Add New Deck</Link>
        </div>
    )
}

export default Header

