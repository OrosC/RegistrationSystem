import React, {useEffect, useState} from 'react';
import './App.css';
import Nav from './ui/components/Nav';
import Menu from './ui/components/Menu';
import Main from "./ui/Main";
import Users from "./ui/Users";
import AddUser from "./ui/AddUser";
import {BrowserRouter, Route} from "react-router-dom";
import UsersEdit from "./ui/UsersEdit";
import ConfirmUser from "./ui/ConfirmUser";
import axios from "axios";


function App() {

    useEffect(() => {
        (async () => {
            await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'no-cors',

            });
        })();
    }, []);

  return (
    <div className="App">

        <section>
           <Nav />
                <h2 className="align-items-center p-3 border-bottom" >Product Section</h2>
                <BrowserRouter>
                    <Route path='/' exact component={Main}></Route>
                    <Route path='/app/users' exact component={Users}></Route>
                    <Route path='/app/confirm' exact component={ConfirmUser}></Route>
                    <Route path='/app/users/add-user' component={AddUser}></Route>
                    <Route path='/app/users/:id/edit' component={UsersEdit}></Route>
                </BrowserRouter>
         </section>
     </div>
  );
}

export default App;
