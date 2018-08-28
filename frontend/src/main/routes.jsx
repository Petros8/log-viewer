import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Dashboard from '../dashboard/dashboard';
import Apps from '../apps/apps';
import NotFound from '../not-found/not-found';
import Notificator from '../common/notifications/notificator';

export default class MainRoutes extends Component {

    render() {
        return <div>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/apps" component={Apps}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
                <Notificator />
            </div>
    }

}