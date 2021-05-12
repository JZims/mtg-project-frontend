import {Link} from "react-router-dom"

function DeckCard({ id, deckName, imgUrl, checkedOut, rentalsArr, owner }) {

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


    return (
        <Link to={`/deckinfo/${id}`}>
            <div className="card-container">
                <img src={imgUrl} alt="commander" style={{height: "200px"}}/>
                <div className="card-info">
                    <h2>{deckName}</h2>
                    <h3>{owner}</h3>
                    { rentalsArr.length === 0 ? <p>No reviews yet.</p> : <p>{average(rentalsArr)}</p>}
                    {checkedOut ? <p id="unavail">Currently Unavailable</p> : <p id="avail">Available to Rent!</p>}
                </div>
            </div>
        </Link>
    )
}

export default DeckCard