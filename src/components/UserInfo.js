import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DeckCardMini from "./DeckCardMini"
// import DeckCard from "./DeckCard"

function UserInfo() {
    const params = useParams()
    const [userData, setUserData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:9292/owners/${params.id}`)
            .then(resp => resp.json())
            .then(function(userFromServer) {
                setUserData(userFromServer)
                setIsLoaded(true)
            })
    }, [params.id])
    
    if (isLoaded) {
        const deckCardsArray = userData.decks.map(function(deck) {
            return <DeckCardMini
                        key={deck.id}
                        id={deck.id}
                        deckName={deck.name}
                        imgUrl={deck.img_url}
                        checkedOut={deck.checked_out}
                />

            // return <Link to={`/deckinfo/${deck.id}`} className="deck-link">{deck.name}</Link>
        })

        return (
            <div className="page">
                <div id="tag">
                    <h1>{userData.name}'s Decks</h1>
                    <div id="deck-link-collection">
                        {deckCardsArray}
                    </div>
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

export default UserInfo