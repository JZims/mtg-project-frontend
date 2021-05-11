import InfoPanel from "./InfoPanel"
import ReviewCard from "./ReviewCard"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function DeckInfo() {
    const [deckData, setDeckData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const params = useParams()
    // console.log (params)

    useEffect(() => {
        fetch(`http://localhost:9292/decks/${params.id}`)
            .then(resp => resp.json())
            .then(function(serverDeckData) {
                setDeckData(serverDeckData)
                setIsLoaded(true)
            })
    }, [params.id])

    if (isLoaded) {
        return (
            <div className="page" id="deck-info">
            <InfoPanel name={deckData.name}
                       imgUrl={deckData.img_url}
                       bio={deckData.deck_bio}
                       listUrl={deckData.link_url}
                       checkedOut={deckData.checked_out}
            />
            <h2>Player Reviews</h2>
            <div className="review-card-container">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    )
} else {
    return null
}
}

export default DeckInfo