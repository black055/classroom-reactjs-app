import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    //const apiUrl = "https://btcn-3-webnc.herokuapp.com";
    const apiUrl = "http://localhost:3000";
    const cookies = new Cookies();

    useEffect(() => {
        axios.get(`${apiUrl}/users/logged-in`, { withCredentials:true } )
        .then(res => {
            if (res.data && !isLoggedIn) {
                setIsLoggedIn(true);
                setUser(res.data);
            }
            else if (!res.data && isLoggedIn) {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch(error => {
            console.log("check login error", error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        cookies.remove('token');
    }

    return (
        <Switch>
            <Route exact path="/" component={() => (<Home isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />)} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>      
    );
}

export default App;