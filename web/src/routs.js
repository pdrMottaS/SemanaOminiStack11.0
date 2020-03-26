import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './pages/logon/index';
import Register from './pages/resgister/index';
import Profile from './pages/profile/index';
import NewIncident from './pages/newIncident/index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}