import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Switch , Route} from "react-router-dom";
import {Provider} from "react-redux";

import Main from "./components/main/main";
import Login from "./components/login/login";
import Register from "./components/register/register";
import store from "./redux/store";

import './index.css';


ReactDOM.render(
        
(           
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={Main} />
                </Switch>
            </HashRouter>
        </Provider> )

    , document.getElementById('root'));

