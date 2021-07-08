import React, { useState } from "react";
import "./app.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
            </Switch>
          </Router>
        </div>

      )}

      
    </div>
  );
}

export default App;
