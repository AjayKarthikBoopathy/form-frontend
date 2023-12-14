import { Switch, Route } from 'react-router-dom';
import './App.css';
import Users from './Components/Users.js';
import AddUser from './Components/AddUser.js';
import UpdateUser from './Components/UpdateUser.js';
import Nopage from './Components/Nopage';
import DashBoard from './Components/Dashboard.js';
import { Redirect } from 'react-router-dom';


function App() {


  return (
    <div className="App">
      <Switch>

        <Route exact path="/">
          <DashBoard />
        </Route>

        <Route path="/users/all">
          <Users />
        </Route>

        <Route path="/details">
          <Redirect to="/users/all" />
        </Route>

        <Route path="/users/add">
          <AddUser />
        </Route>

        <Route path="/users/edit/:id">
          <UpdateUser />
        </Route>

        <Route path="**">
          <Nopage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;