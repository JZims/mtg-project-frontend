import InfoPanel from "./InfoPanel"
import ReviewCard from "./ReviewCard"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function DeckInfo({setFilteredDeck}) {
    const [deckData, setDeckData] = useState({})
    const [rentalsArray, setRentalsArray] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [forceTrigger, setForceTrigger] = useState(true)
    const params = useParams()
    // console.log (params)
    
    useEffect(() => {
        fetch(`http://localhost:9292/decks/${params.id}`)
            .then(resp => resp.json())
            .then(function(serverDeckData) {
                setDeckData(serverDeckData)
                setRentalsArray(serverDeckData.rentals)
                setIsLoaded(true)
                console.log("forceTrigger fired")
            })
    }, [params.id, forceTrigger])

    // function getNewRental(newRentalServerObj) {
    //     setRentalsArray(...rentalsArray, newRentalServerObj)
    // }

    function forceReload() {
        setForceTrigger(!forceTrigger)
    }

    if (isLoaded) {

        const nullReviewsFiltered = rentalsArray.filter(function(rental) {
            return rental.rating !== null
        })

        const reviewCardArray = nullReviewsFiltered.map(function(rental) {
            return <ReviewCard key={rental.id}
                        review={rental.review}
                        rating={rental.rating}
                        name={rental.renter.name}
            />
        })
    
        return (
            <div className="page" id="deck-info">
            <InfoPanel name={deckData.name}
                       imgUrl={deckData.img_url}
                       bio={deckData.deck_bio}
                       listUrl={deckData.link_url}
                       checkedOut={deckData.checked_out}
                       rentalsArr={rentalsArray}
                       id={deckData.id}
                       setFilteredDeck={setFilteredDeck}
                       owner={deckData.owner.name}
                       forceReload={forceReload}
                    //    setForceTrigger={setForceTrigger}
                    //    forceTrigger={forceTrigger}
                    //    getNewRental={getNewRental}
                       
            />
            <h2>Player Reviews ({nullReviewsFiltered.length})</h2>
            <div className="review-card-container">
                {reviewCardArray}
            </div>
        </div>
    )
} else {
    return null
}
}

export default DeckInfo