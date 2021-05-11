function NewDeck() {

    return (
        <div className="page" id="new-deck">
            <h2>List a New Deck</h2>
            <form className="form" id="new-deck">
                <input placeholder="Deck Name"/>
                <br/>
                <input placeholder="Commander"/>
                <br/>
                <input placeholder="Decklist URL"/>
                <br/>
                <input placeholder="Owner"/>
                <br/>
                <textarea placeholder="Description" />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewDeck