import {Link} from "react-router-dom"

function DeckCard() {

    return (
        <Link to={`/deckinfo/1`}>
            <div className="card-container">
                <img src="https://c1.scryfall.com/file/scryfall-cards/large/front/e/d/ed5f96a4-55e0-4ae3-bd78-f01703649e9d.jpg?1562442656" alt="commander" style={{height: "200px"}}/>
                <div className="card-info">
                    <h2>Deck Name</h2>
                    <h3>Owner Name</h3>
                    <p>Maybe rating</p>
                    <p>Available?</p>
                </div>
            </div>
        </Link>
    )
}

export default DeckCard