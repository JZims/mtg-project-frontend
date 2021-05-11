function InfoPanel() {

    return (
            <div className="info-container">
                <img src="https://c1.scryfall.com/file/scryfall-cards/large/front/e/d/ed5f96a4-55e0-4ae3-bd78-f01703649e9d.jpg?1562442656" alt="commander" style={{height: "400px"}}/>
                <div className="info-box">
                    <h2>Deck Name</h2>
                    <p>Decklist URL</p>
                    <p>Owner Name</p>
                    <div className="deck-desc">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                    <button>Check Out</button>
                    <button>Delete Deck</button>
                </div>
            </div>
    )
}

export default InfoPanel