import {useEffect,useState} from 'react'

function NewDeck({setNewDeck}) {
    const [newDeckName, setNewDeckName] = useState("")
    const [newDeckCommander, setNewDeckCommander] = useState("")
    const [newDecklistLink, setNewDecklistLink] = useState("")
    const [newDeckOwner, setNewDeckOwner] = useState("")
    const [newDeckDescription, setNewDeckDescription] = useState("")
    const [ownersArray, setOwnersArray] = useState([])
    // const [scryfallFetchSuccessful, setScryfallFetchSuccessful] = useState(false)

    useEffect(() =>{
        fetch("http://localhost:9292/owners")
        .then(res => res.json())
        .then(function(ownersOnServer) {
            setOwnersArray(ownersOnServer)
        })
    },[])
    


    const newDeckObj = {
        name: "", 
        link_url: "",
        owner_id: 0, 
        deck_bio: "", 
        img_url: "", 
        commander_id: "",
        checked_out: false
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

        } else { 
            splitCommander = newDeckCommander 
        }

        let foundOwner = ownersArray.find(function(owner) {
            return owner.name.toLowerCase() === newDeckOwner.toLowerCase()
        })
        // console.log(foundOwner)

        // If the owner already exists, assigning that owner's ID to owner_id
        if (foundOwner === undefined) {
            fetch("http://localhost:9292/owners", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: newDeckOwner})
            })
            .then(resp => resp.json())
            .then(function(newOwnerObj) {
                newDeckObj.owner_id = newOwnerObj.id
                setOwnersArray([...ownersArray, newOwnerObj])
            })
            // newDeckObj.owner_id = 1321
            // console.log(`${newDeckOwner} posted to server.`)
        } else {
            console.log(`newDeckObj.owner_id set to ${foundOwner.id}`)
            newDeckObj.owner_id = foundOwner.id
        }
        // let owner = ownersArray.filter(function(owner){return owner.name === newDeckObj.name})

        fetch(`https://api.scryfall.com/cards/named?fuzzy=${splitCommander}`)
        .then(resp => resp.json())
        .then(r => {
            scryfallInfo.commander_id = r.id
            scryfallInfo.image_url = r.image_uris.large

            newDeckObj.name = newDeckName
            newDeckObj.link_url = newDecklistLink
            // newDeckObj.owner.id = newDeckOwner
            newDeckObj.deck_bio = newDeckDescription 
            newDeckObj.img_url = scryfallInfo.image_url
            newDeckObj.commander_id = scryfallInfo.commander_id

            handleDeckCreation()
            
        })

    }

    function handleDeckCreation(){

        console.log(newDeckObj)

            fetch("http://localhost:9292/decks", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newDeckObj)
            })
                .then(resp => resp.json())
                .then(function(returnedDeckObj) {
                    setNewDeck(returnedDeckObj)
                })
    }


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