function InfoPanel({ name, imgUrl, bio, listUrl, checkedOut, rentalsArr }) {

    function average(array) {
        let ratingsArr = array.map(function(rental) {
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
                    {checkedOut ? <button>Check In</button> : <button>Check Out</button>}
                    <button>Delete Deck</button>
                </div>
            </div>
    )
}

export default InfoPanel