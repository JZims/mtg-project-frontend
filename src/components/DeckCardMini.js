import {Link} from "react-router-dom"

function DeckCardMini({ id, deckName, imgUrl, checkedOut }) {

    
    return (
        <Link to={`/deckinfo/${id}`}>
            <div className="card-container">
                <img src={imgUrl} alt="commander" style={{height: "200px"}}/>
                <div className="card-info">
                    <h2>{deckName}</h2>
                    {checkedOut ? <p id="unavail">Currently Unavailable</p> : <p id="avail">Available to Rent!</p>}
                </div>
            </div>
        </Link>
    )
}

export default DeckCardMini