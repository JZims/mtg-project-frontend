import {Link} from "react-router-dom"

function DeckCard({ id, deckName, imgUrl}) {

    return (
        <Link to={`/deckinfo/1`}>
            <div className="card-container">
                <img src={imgUrl} alt="commander" style={{height: "200px"}}/>
                <div className="card-info">
                    <h2>{deckName}</h2>
                    <h3>Owner Name</h3>
                    <p>Maybe rating</p>
                    <p>Available?</p>
                </div>
            </div>
        </Link>
    )
}

export default DeckCard