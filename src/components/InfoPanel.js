import {Button} from 'semantic-ui-react';
import { useHistory } from "react-router";
import { Link } from "react-router-dom"
import CheckOut from "./CheckOut";
import CheckIn from './CheckIn';

function InfoPanel({ name, imgUrl, bio, listUrl, checkedOut, rentalsArr, id, setFilteredDeck, owner, forceReload, scryfallUrlTag}) {
    const history = useHistory()

    function average(array) {
        let filteredArr = array.filter(function(rental) {
            return rental.rating !== null
        })
        if (filteredArr.length !== 0) {
            let ratingsArr = filteredArr.map(function(rental) {
                return rental.rating
            })
            let avgRating = (array) => array.reduce((a, b) => a + b) / array.length;
            if (avgRating(ratingsArr) <= 1) {
                return "⭐"
            } else if (avgRating(ratingsArr) > 1 && avgRating(ratingsArr) <= 2) {
                return "⭐⭐"
            } else if (avgRating(ratingsArr) > 2 && avgRating(ratingsArr) <= 3) {
                return "⭐⭐⭐"
            } else if (avgRating(ratingsArr) > 3 && avgRating(ratingsArr) <= 4) {
                return "⭐⭐⭐⭐"
            } else {
                return "⭐⭐⭐⭐⭐"
            }
        }
    }

    function handleDelete() {
    
        fetch(`http://localhost:9292/decks/${id}`, {
            method: "DELETE"
        })
            .then(resp => resp.json())
            .then(function(deletedDeckObj) {
                setFilteredDeck(deletedDeckObj.id)
                 history.push("/decks")
            })
        // console.log(`Deck ${id} deleted.`)
        // history.push("/decks")
        
    }

    function renterName(renter) {
        return `${renter.name}`
    }

    function renterNameDisplayLogic(name) {
        if (rentalsArr.length === 0) {
            return name
        } else {
            return rentalsArr[rentalsArr.length - 1].renter.name
        }
    }

    function checkNullStatus(rentalsArr) {
        if (rentalsArr.length === 1 && rentalsArr[rentalsArr.length - 1].rating === null) {
            return <p>No reviews yet.</p>
        } else if (rentalsArr.length > 1 && rentalsArr[rentalsArr.length - 1].rating === null) {
            return <p><span className="stars">{average(rentalsArr)}</span></p>
        } else {
            return <p><span className="stars">{average(rentalsArr)}</span></p>
        }
    }

    // console.log(rentalsArr[-1])
    return (
            <div className="info-container">
                <a href={`https://scryfall.com/card/${scryfallUrlTag}`} target="blank" title="View on Scryfall"><img src={imgUrl} alt="commander" style={{height: "412px"}}/></a>
                <div className="info-box">
                    <h2>{name}</h2>
                    <span>a deck by</span>
                    <Link to={`/user/${owner.id}`}><h3 className="owner">{owner.name}</h3></Link>
                    {rentalsArr.length === 0 ? <p>No reviews yet.</p> : checkNullStatus(rentalsArr)}
                    <p className="deck-url"><a href={listUrl} target="blank">View Decklist</a></p>
                    <div className="deck-desc">
                        <p>{bio}</p>
                    </div>
                    {checkedOut ? <span>Checked out to <strong>{renterNameDisplayLogic(renterName)}</strong></span> : null}
                    <br/>
                    {checkedOut ? <CheckIn id={id}forceReload={forceReload} rentalsArr={rentalsArr}/> : <CheckOut id={id} forceReload={forceReload} renterName={renterName}/>}
                    <Button className="info-panel-buttons" onClick={handleDelete}>Delete Deck</Button>
                </div>
            </div>
    )
}

export default InfoPanel