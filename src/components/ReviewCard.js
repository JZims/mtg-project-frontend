function ReviewCard({ review, rating, name}) {

    function ratingInStars(int) {
        if (int === 1) {
            return "⭐"
        } else if (int === 2) {
            return "⭐⭐"
        } else if (int === 3) {
            return "⭐⭐⭐"
        } else if (int === 4) {
            return "⭐⭐⭐⭐"
        } else if (int === 5) {
            return "⭐⭐⭐⭐⭐"
        }
    }

    return (
        <div className="review-container">
                <h3>{name}</h3>
                <h4>{ratingInStars(rating)}</h4>
                <p>{review}</p>
        </div>
    )
}

export default ReviewCard



