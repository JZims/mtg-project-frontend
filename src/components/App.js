
import {useState} from 'react'
import { Switch, Route } from "react-router-dom";
import AllDecks from "./AllDecks";
import DeckInfo from "./DeckInfo";
import Header from "./Header";
import NewDeck from "./NewDeck";
import Welcome from "./Welcome";

function App() {

  const [filteredDeck, setFilteredDeck]= useState()
  const [newDeck, setNewDeck] = useState({})
  // const [forceTrigger, setForceTrigger] = useState(true)
  
  // function addNewDeck(newDeck) {
  //   setDecksArray([...decksArray, newDeck])
  // }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/deckinfo/:id">
          <DeckInfo setFilteredDeck={setFilteredDeck}
                    // setForceTrigger={setForceTrigger}
                    // forceTrigger={forceTrigger} 
                    />
        </Route>
        <Route exact path="/newdeck">
          <NewDeck setNewDeck={setNewDeck}/>
        </Route>
        <Route exact path="/decks">
          <AllDecks filteredDeck={filteredDeck}
                    newDeck={newDeck}
                    // forceTrigger={forceTrigger}
                    />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
