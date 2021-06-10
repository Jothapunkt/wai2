import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawingBoard} from "../drawingboard/DrawingBoard";
import {RouteButton} from "./RouteButton";
import {DiffSync} from "../algos/DiffSync";

export const Routing: React.FC = (): JSX.Element => {
    return <Router>
        <Switch>
            <Route path="/drawingboard" render={() => <DrawingBoard algo={new DiffSync()}/>}/>
            <Route path="/">
                <RouteButton route='/drawingboard'>Drawingboard</RouteButton>
            </Route>
        </Switch>
    </Router>;
}
