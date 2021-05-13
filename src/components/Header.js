import { useState } from "react"
import {Link} from "react-router-dom"
import { useHistory } from "react-router"

function Header() {
    const [searchValue, setSearchValue] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        console.log(searchValue)
        setSearchValue("")
        fetch("http://localhost:9292/owners")
            .then(resp => resp.json())
            .then(function(serverOwnersArray) {
                let foundOwner = serverOwnersArray.find(function(owner){
                    return owner.name.toLowerCase() === searchValue.toLowerCase()
                })
                if (foundOwner !== undefined) {
                    history.push(`/user/${foundOwner.id}`)
                }
            })
    }

    // console.log(searchValue)

    return (
        <div className="header">
            <Link to="/">
            <img src="https://i.imgur.com/djniZvE.png" alt="logo" style={{ height: "100px" }}/> 
            </Link>
            <Link to="/decks" className="nav-link">Decks</Link>
            <Link to="/newdeck" className="nav-link">Add New Deck</Link>
            <form className="nav-link" onSubmit={e => handleSubmit(e)}>
                <input type="text" value={searchValue} id="search-users" placeholder="Search Users" onChange={e => setSearchValue(e.target.value)}/>
            </form>
        </div>
    )
}

export default Header

