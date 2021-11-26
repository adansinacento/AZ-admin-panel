import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home";
import Shipments from "./core/Shipments";


const Routes = () => {
    return ( 
        <BrowserRouter>
            
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shipments" exact component={Shipments} />
                <Route path="/users" exact component={Home} />
                

            </Switch>

        </BrowserRouter>
     );
}
 
export default Routes;