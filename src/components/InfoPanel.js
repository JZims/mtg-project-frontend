function InfoPanel({ name, imgUrl, bio, listUrl, checkedOut }) {

    return (
            <div className="info-container">
                <img src={imgUrl} alt="commander" style={{height: "400px"}}/>
                <div className="info-box">
                    <h2>{name}</h2>
                    <p><a href={listUrl} target="blank">View Decklist</a></p>
                    <p>Owner Name</p>
                    <div className="deck-desc">
                        <p>{bio}</p>
                    </div>
                    {checkedOut ? <button>Check In</button> : <button>Check Out</button>}
                    <button>Delete Deck</button>
                </div>
            </div>
    )
}

export default InfoPanel