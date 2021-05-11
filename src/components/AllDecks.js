import DeckCard from "./DeckCard";


function AllDecks() {

    return (
        <div className="page" id="all-decks">
            <select name="filter" id="deck-filter">
                <option value="All">All Decks</option>
                <option value="Available">Available to Rent</option>
            </select>
            <div id="all-decks-list">
                <DeckCard />
                <DeckCard />
                <DeckCard />
                <DeckCard />
            </div>
        </div>
    )
}

export default AllDecks