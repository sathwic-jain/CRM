import { Switch, Route, Link } from "react-router-dom";
import { Basicform } from "./form.js";
import "./App.css";
import { Adduser } from "./Adduser.js";
import { Leads } from "./Leads.js";
import { AddLeads } from "./AddLeads";
import { Edit } from "./Edit";
import { Allusers } from "./Allusers";


function App() {
  const display = localStorage.getItem("token");
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {display ? (
          <div>
            <li>
              <Link to="/Users">Add User</Link>
            </li>
            <li>
              <Link to="/leads">Leads</Link>
            </li>
            <li>
              <Link to="/addleads">AddLeads</Link>
            </li>
            <li>
              <Link to="/alluser">All users</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </div>
        ) : (
          <li>
            <Link to="/Login">Login</Link>
          </li>
        )}
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Login">
          <Basicform />
        </Route>
        <Route exact path="/Users">
          <Adduser />
        </Route>
        <Route exact path="/leads">
          <Leads />
        </Route>
        <Route exact path="/addleads">
          <AddLeads />
        </Route>
        <Route exact path="/EditLeads/:id">
          <Edit />
        </Route>
        <Route exact path="/alluser">
          <Allusers />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
      </Switch>
    </div>
  );
}

function Logout() {
  localStorage.removeItem("token");
  console.log("done");
  console.log(localStorage.getItem("token"));
  
  return (
    <div>
      <h1>Login to continue</h1>
    </div>
  );
}

function Home() {
  return <div>Hello</div>;
}
export default App;
