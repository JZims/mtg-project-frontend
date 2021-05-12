import DeckCard from "./DeckCard";
import {useState, useEffect} from "react"

function AllDecks({filteredDeck, newDeck, forceTrigger }) {
    const [decksArray, setDecksArray] = useState([])
    

    // Initial fetch to server for decks
    useEffect(() => {
        fetch("http://localhost:9292/decks")
            .then(resp => resp.json())
            .then(function(deckServerData) {
                setDecksArray(deckServerData)
            })
            console.log("array refreshed")
    }, [newDeck])

    // const arrayWithNewDeck = [...decksArray, newDeck]
    
    const filteredFromDelete = decksArray.filter(deck => deck.id !== filteredDeck)
    console.log(filteredFromDelete)
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
}

export default AllDecks