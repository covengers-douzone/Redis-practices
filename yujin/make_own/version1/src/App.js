import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import {Chat, Login} from "./pages";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/chat" exact={true} component={Chat}/>
            </Switch>
        </div>
    );
}

export default App;
