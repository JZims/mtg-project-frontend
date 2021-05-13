function Welcome() {

    return (
        <div className="page" id="welcome-page">
            <div id="quotes-container">
                <div className="quotes-block" id="quotes-block-1">
                    <div className="quote">
                        "They tried."
                        <br/>
                        <strong>The Wall Street Journal</strong>
                    </div>
                        <br/>
                    <div className="quote">
                        "I think this website just installed AOL on my computer."
                        <br/>
                        <strong>Forbes</strong>
                    </div>
                </div>
                <img src="https://i.imgur.com/USMGLoV.png" alt="logo" style={{ height: "500px" }}/>
                <div className="quotes-block" id="quotes-block-2">
                    <div className="quote">
                        "It works. Not well, but it works."
                        <br/>
                        <strong>CNET</strong>
                    </div>
                    <br/>
                    <div className="quote">
                        "What the hell is MTG?"
                        <br/>
                        <strong>The New York Times</strong>
                    </div>
                </div>
            </div>
            <h2>Welcome to <span id="splash-name">MTG Deck Swap</span></h2>
            <p>The Endless Commander Deckbox</p>
        </div>
    )
}

export default Welcome