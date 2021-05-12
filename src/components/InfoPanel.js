import {Button} from 'semantic-ui-react';
import { useHistory } from "react-router";
import CheckOut from "./CheckOut";

function InfoPanel({ name, imgUrl, bio, listUrl, checkedOut, rentalsArr, id, setFilteredDeck}) {
    const history = useHistory()

    function average(array) {
        let filteredArr = array.filter(function(rental) {
            return rental.rating !== null
        })
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

    function handleDelete() {
    
        fetch(`http://localhost:9292/decks/${id}`, {
            method: "DELETE"
        })
            .then(resp => resp.json())
            .then(function(deletedDeckObj) {
                setFilteredDeck(deletedDeckObj.id)
                 history.push("/decks")
            })
        console.log(`Deck ${id} deleted.`)
        history.push("/decks")
        
    }

    return (
            <div className="info-container">
                <img src={imgUrl} alt="commander" style={{height: "400px"}}/>
                <div className="info-box">
                    <h2>{name}</h2>
                    <h3>Owner Name</h3>
                    {/* <strong>Average Rating:</strong> */}
                    {rentalsArr === [] ? <p>No reviews yet.</p> : <p>{average(rentalsArr)}</p>}
                    <p><a href={listUrl} target="blank">View Decklist</a></p>
                    <div className="deck-desc">
                        <p>{bio}</p>
                    </div>
                    {checkedOut ? <button>Check In</button> : <CheckOut />}
                    <Button onClick={handleDelete}>Delete Deck</Button>
                </div>
            </div>
    )
}

export default InfoPanel