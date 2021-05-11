import {useEffect,useState} from 'react'

function NewDeck() {
    const [newDeckName, setNewDeckName] = useState("")
    const [newDeckCommander, setNewDeckCommander] = useState("")
    const [newDecklistLink, setNewDecklistLink] = useState("")
    const [newDeckOwner, setNewDeckOwner] = useState("")
    const [newDeckDescription, setNewDeckDescription] = useState("")
    const [usersArray, setUsersArray] = useState([])
    // const [fetchSuccessful, setFetchSuccessful] = useState(false)

useEffect(() =>{
    fetch("http://localhost:9292/users/")
    .then(res => res.json())
    .then(res => setUsersArray(res))
},[])

    const newDeckObj = {
        name: "", 
        decklist_link: "",
        deck_owner: "", 
        deck_description: "", 
        img_url: "", 
        commander_id: ""
    }

    function handleNewDeckSubmit(e){
        e.preventDefault()

        let splitCommander

        const scryfallInfo = {
            commander_id: "", 
            name: "", 
            image_url: "" 
        }

        if (newDeckCommander.includes(" ")){
            splitCommander = newDeckCommander.split(" ").join("+")

        } else { splitCommander = newDeckCommander }


        // if (newDeckOwner

        fetch(`https://api.scryfall.com/cards/named?fuzzy=${splitCommander}`)
        .then(resp => resp.json())
        .then(r => {
            scryfallInfo.commander_id = r.id
            scryfallInfo.image_url = r.image_uris.large
        
            newDeckObj.name = newDeckName
            newDeckObj.link_url = newDecklistLink
            newDeckObj.deck_owner = newDeckOwner
            newDeckObj.deck_description = newDeckDescription 
            newDeckObj.img_url = scryfallInfo.image_url
            newDeckObj.commander_id = scryfallInfo.commander_id
        
             console.log(newDeckObj)
        })

        
        
    
    // fetch("http://localhost:9292"
    
    }

    // console.log(newDeckObj)

    return (
        <div className="page" id="new-deck">
            <h2>List a New Deck</h2>
            <form className="form" id="new-deck">
                <input name="deck_name" placeholder="Deck Name" onChange={e => setNewDeckName(e.target.value)}/>
                <br/>
                <input name="commander" placeholder="Commander" onChange={e => setNewDeckCommander(e.target.value)}/>
                <br/>
                <input name="decklist_url" placeholder="Decklist URL" onChange={e => setNewDecklistLink(e.target.value)}/>
                <br/>
                <input name="owner" placeholder="Owner" onChange={e => setNewDeckOwner(e.target.value)}/>
                <br/>
                <textarea name="description" placeholder="Description" onChange={e => setNewDeckDescription(e.target.value)}/>
                <br/>
                <input type="submit" value="Submit" onClick={handleNewDeckSubmit}/>
            </form>
            
        </div>
    )
}

export default NewDeck