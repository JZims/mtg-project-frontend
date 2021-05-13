import {Button} from 'semantic-ui-react';
import { useHistory } from "react-router";
import CheckOut from "./CheckOut";
import CheckIn from './CheckIn';

function InfoPanel({ name, imgUrl, bio, listUrl, checkedOut, rentalsArr, id, setFilteredDeck, owner, forceReload, scryfallUrlTag}) {
    const history = useHistory()

    function average(array) {
        let filteredArr = array.filter(function(rental) {
            return rental.rating !== null
        })
        if (filteredArr.length !== 0) {
            let ratingsArr = filteredArr.map(function(rental) {
                return rental.rating
            })
            let avgRating = (array) => array.reduce((a, b) => a + b) / array.length;
            if (avgRating(ratingsArr) <= 1) {
                return "⭐"
            } else if (avgRating(ratingsArr) > 1 && avgRating(ratingsArr) <= 2) {
                return "⭐⭐"
            } else if (avgRating(ratingsArr) > 2 && avgRating(ratingsArr) <= 3) {
                return "⭐⭐⭐"
            } else if (avgRating(ratingsArr) > 3 && avgRating(ratingsArr) <= 4) {
                return "⭐⭐⭐⭐"
            } else {
                return "⭐⭐⭐⭐⭐"
            }
        }
    }

    function handleDelete() {
    
        fetch(`http://localhost:9292/decks/${id}`, {
            method: "DELETE"
        })
            .then(resp => resp.json())
            .then(function(deletedDeckObj) {
                setFilteredDeck(deletedDeckObj.id)
                 history.push("/decks")
            })
        // console.log(`Deck ${id} deleted.`)
        // history.push("/decks")
        
    }

    return (
            <div className="info-container">
                <a href={`https://scryfall.com/card/${scryfallUrlTag}`} target="blank" title="View on Scryfall"><img src={imgUrl} alt="commander" style={{height: "412px"}}/></a>
                <div className="info-box">
                    <h2>{name}</h2>
                    <span>deck by</span>
                    <h3 className="owner">{owner}</h3>
                    {rentalsArr.length === 0 ? <p>No reviews yet.</p> : <p><span className="stars">{average(rentalsArr)}</span></p>}
                    <p className="deck-url"><a href={listUrl} target="blank">View Decklist</a></p>
                    <div className="deck-desc">
                        <p>{bio}</p>
                    </div>
                    {checkedOut ? <CheckIn id={id}forceReload={forceReload}/> : <CheckOut id={id} forceReload={forceReload}/>}
                    <Button className="info-panel-buttons" onClick={handleDelete}>Delete Deck</Button>
                </div>
            </div>
    )
}

export default InfoPanel