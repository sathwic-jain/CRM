import{Switch,Route,Link} from "react-router-dom";
import {useState} from "react";
import {Basicform} from './form.js';
import './App.css';
import { Adduser } from "./Adduser.js";
import {Leads} from "./Leads.js";
import { AddLeads } from "./AddLeads";
import { Edit } from "./Edit";
import {Allusers} from "./Allusers";

function App() {

  return (
   <div>
     <ul>
       <li>
     <Link to="/">
       Login
     </Link>
     </li>
     <li>
     <Link to="/Users">
       Add User
     </Link>
     </li>
     <li>
     <Link to="/leads">
       Leads
     </Link>
     </li>
     <li>
     <Link to="/addleads">
       AddLeads
     </Link>
     </li>
     <li>
     <Link to="/alluser">
       All users
     </Link>
     </li>
     </ul>
     <Switch>
       <Route exact path="/">
         <Basicform />
       </Route>
       <Route exact path="/Users">
         <Adduser />
       </Route>
       <Route exact path="/leads">
         <Leads/>
       </Route>
       <Route exact path="/addleads">
         <AddLeads/>
         </Route>
       <Route exact path="/EditLeads/:id">
         <Edit/>
       </Route>
       <Route exact path="/alluser">
         <Allusers/>
       </Route>
     </Switch>
   </div>
  );
}

export default App;
