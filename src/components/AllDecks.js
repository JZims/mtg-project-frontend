import DeckCard from "./DeckCard";
import {useState, useEffect} from "react"

function AllDecks({filteredDeck, newDeck, forceTrigger }) {
    const [decksArray, setDecksArray] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    

    // Initial fetch to server for decks
    useEffect(() => {
        fetch("http://localhost:9292/decks")
            .then(resp => resp.json())
            .then(function(deckServerData) {
                setDecksArray(deckServerData)
                setIsLoaded(true)
            })
            console.log("array refreshed")
    }, [newDeck])


    
    if (isLoaded) {
        const filteredFromDelete = decksArray.filter(deck => deck.id !== filteredDeck)
        // console.log(filteredFromDelete)
        const deckCardArray = filteredFromDelete.map(function(deck) {
            return <DeckCard 
                    key={deck.id}
                    id={deck.id}
                    deckName={deck.name}
                    imgUrl={deck.img_url}
                    checkedOut={deck.checked_out}
                    rentalsArr={deck.rentals}
                    owner={deck.owner.name}
            />
        })

        return (
            <div className="page" id="all-decks">
                <select name="filter" id="deck-filter">
                    <option value="All">All Decks</option>
                    <option value="Available">Available to Rent</option>
                </select>
                <div id="all-decks-list">
                    {deckCardArray}
                </div>
            </div>
        )
    } else {
        return (
            <div className="page">
                <img src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg" alt="loading" style={{ height: "100px"}} className="loading"/>
            </div>
        )
    }
}

export default AllDecks