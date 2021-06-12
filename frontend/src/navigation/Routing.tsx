import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawingBoard} from "../drawingboard/DrawingBoard";
import {RouteButton} from "./RouteButton";
import {DiffSync} from "../algos/DiffSync";
import {Notepad} from "../notepad/Notepad";
import {JiffAlgo} from "../algos/JiffAlgo";
import {diffsyncDrawID, diffsyncNotepadID} from "../data/dataIDs";
import {MetricsDashboard} from "../metrics/MetricsDashboard";
import {Generator} from "../generate/Generator";

export const Routing: React.FC = (): JSX.Element => {
    return <Router>
        <Switch>
            <Route exact path="/drawingboard/diffsync" render={() => <DrawingBoard algo={new DiffSync(diffsyncDrawID)}/>}/>
            <Route exact path="/drawingboard/jiff" render={() => <DrawingBoard algo={new JiffAlgo('drawingboard')}/>}/>

            <Route exact path="/notepad/diffsync" render={() => <Notepad algo={new DiffSync(diffsyncNotepadID)}/>}/>
            <Route exact path="/notepad/jiff" render={() => <Notepad algo={new JiffAlgo('notepad')}/>}/>

            <Route exact path="/metrics" render={() => <MetricsDashboard/>}/>
            <Route exact path="/generate" render={() => <Generator/>}/>

            <Route path="/">
                <RouteButton route='/drawingboard/diffsync'>Drawingboard (diffsync)</RouteButton>
                <RouteButton route='/drawingboard/jiff'>Drawingboard (Jiff)</RouteButton>
                <RouteButton route='/notepad/diffsync'>Notepad (diffsync)</RouteButton>
                <RouteButton route='/notepad/jiff'>Notepad (Jiff)</RouteButton>
                <RouteButton route='/metrics'>Metrics</RouteButton>
                <RouteButton route='/generate'>Generator</RouteButton>
            </Route>
        </Switch>
    </Router>;
}
