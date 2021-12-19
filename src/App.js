import { Switch, Route, Link } from "react-router-dom";
import { Basicform } from "./form.js";
import "./App.css";
import { Adduser } from "./Adduser.js";
import { Leads } from "./Leads.js";
import { AddLeads } from "./AddLeads";
import { Edit } from "./Edit";
import { Allusers } from "./Allusers";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

function App() {
  const display = localStorage.getItem("token");
  const [email,setemail]=useState("")
 
  return (
   
    <div >
       <AppBar position="static"> 
      <ul className="appbar">
        <li>
          <Link to="/"><Button variant="text" style={{color:"white"}}>Home</Button></Link>
        </li>
        {display ? (
          <div className="appbar">
            <li>
              <Link to="/Users"><Button variant="text" style={{color:"white"}}>Add User</Button></Link>
            </li>
            <li>
              <Link to="/leads"><Button variant="text" style={{color:"white"}}>Leads</Button></Link>
            </li>
            <li>
              <Link to="/addleads"><Button variant="text" style={{color:"white"}}>AddLeads</Button></Link>
            </li>
            <li>
              <Link to="/alluser"><Button variant="text" style={{color:"white"}}>All users</Button></Link>
            </li>
            <li>
              <Link to="/logout"><Button variant="text" style={{color:"white"}}>Logout</Button></Link>
            </li>
          </div>
        ) : (
          <li>
            <Link to="/Login"><Button variant="text" style={{color:"white"}}>Login</Button></Link>
          </li>
        )}
      </ul>
      </AppBar>
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
        <Route exact path="/forgot">
          <Forgot email={email} setemail={setemail} />
        </Route>
        <Route path="/reset/:resetid">
          <Reset/>
        </Route>
      </Switch>
    </div>
    
  );
}

function Logout() {
  localStorage.removeItem("token");
  
  return (
    <div>
      <h1>Login to continue</h1>
    </div>
  );
}

function Home() {
  return (
  <div className="home">
    <div>
    <div className="description">
        <p>Welcome,to a basic CRM app.
          Here you can add/customize your leads according to your wish.Contact the administrator for an account</p>
      </div>
      </div>
  </div>);
}

export default App;
