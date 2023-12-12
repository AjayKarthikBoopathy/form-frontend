import { Switch,Route } from 'react-router-dom';
import './App.css';
//import Base from './Base/Base';
import Users from './Components/Users.js';
import AddUser from './Components/AddUser.js';
import UpdateUser from './Components/UpdateUser.js';
import { useEffect, useState } from 'react';
import Nopage from './Components/Nopage';
import DashBoard from './Components/Dashboard.js';
import { Redirect } from 'react-router-dom';

// https://restcountries.com/v2/all

function App() {
  const [userData, setUserData] = useState([]);

  

  return (
    <div className="App">
       <Switch>
        
         <Route exact path="/">
             <DashBoard/>
         </Route>

          <Route path="/users/all">
            <Users
            userData = {userData}
            setUserData ={setUserData}
            />
          </Route>

          <Route path="/details">
             <Redirect to ="/users/all"/>
          </Route>

         <Route path="/users/add">
            <AddUser
            userData = {userData}
            setUserData ={setUserData}
            />
         </Route>

         <Route path="/users/edit/:id">
            <UpdateUser
              userData = {userData}
              setUserData ={setUserData}
            />
         </Route>

          <Route path="**">
              <Nopage/>
          </Route>

       </Switch>
    </div>
  );
}

export default App;