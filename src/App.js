import React, { useEffect } from "react";
import BooksList from "./BooksList";
import Characters from "./Characters";
import Movies from "./Movies";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppTabs />
        <Switch>
          <Route exact path={"/books"} component={BooksList} />
          <Route exact path={"/characters"} component={Characters} />
          <Route exact path={"/movies"} component={Movies} />
        </Switch>
      </div>
    </Router>
  );
}

function AppTabs() {
  let history = useHistory();

  function handleRoute(event) {
    const value = event.target.dataset.value;
    history.push(value);
  }

  useEffect(function() {
    history.push("/books");
  }, []);

  return (
    <div className="tabs" onClick={handleRoute}>
      <div className="tab" data-value="books">
        {"Books"}
      </div>
      <div className="tab" data-value={"characters"}>
        {"Characters"}
      </div>
      <div className="tab" data-value="movies">
        {"Movies"}
      </div>
    </div>
  );
}
