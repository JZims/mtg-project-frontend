import InfoPanel from "./InfoPanel"
import ReviewCard from "./ReviewCard"

function DeckInfo() {

    return (
        <div className="page" id="deck-info">
            <InfoPanel />
            <h2>Player Reviews</h2>
            <div className="review-card-container">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    )
}

export default DeckInfo