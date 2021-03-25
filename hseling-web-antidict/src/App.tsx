import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import {About} from './pages/about';
import {Main} from './pages/main';
import {AppMenu} from "./components/app-menu";
import 'antd/dist/antd.css';

export default function App() {
    return (
        <BrowserRouter>
            <AppMenu/>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/main">
                    <Main/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Redirect to='/main'/>
            </Switch>
        </BrowserRouter>
    );
}
