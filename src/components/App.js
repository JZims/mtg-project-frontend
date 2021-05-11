import { Switch, Route } from "react-router-dom";
import AllDecks from "./AllDecks";
import DeckInfo from "./DeckInfo";
import Header from "./Header";
import NewDeck from "./NewDeck";
import Welcome from "./Welcome";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/deckinfo/:id">
          <DeckInfo />
        </Route>
        <Route exact path="/newdeck">
          <NewDeck />
        </Route>
        <Route exact path="/decks">
          <AllDecks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
