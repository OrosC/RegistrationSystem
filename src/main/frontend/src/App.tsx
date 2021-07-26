import React, {useEffect} from 'react';
import './App.css';
import Nav from './ui/components/Nav';
import Main from "./ui/Main";
import Users from "./ui/Users";
import AddUser from "./ui/AddUser";
import {BrowserRouter, Route} from "react-router-dom";
import UsersEdit from "./ui/UsersEdit";
import ConfirmUser from "./ui/ConfirmUser";


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
                    <Route path='/users' exact component={Users}></Route>
                    <Route path='/user/confirm' exact component={ConfirmUser}></Route>
                    <Route path='/register' component={AddUser}></Route>
                    <Route path='/user/:id/edit' component={UsersEdit}></Route>
                </BrowserRouter>
         </section>
     </div>
  );
}

export default App;
