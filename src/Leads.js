import {useHistory} from "react-router-dom";
import {useEffect,useState} from "react";
export function Leads() {
  const [leads,setleads]=useState([]);
  const getleads=()=>{fetch("https://hackathon-crm.herokuapp.com/leads/all",{method:"GET",headers: { "x-emp-token": localStorage.getItem("token")}})
  .then((data) => data.json())
  .then((mvs) => setleads(mvs))};
  useEffect(getleads,[]);
  console.log(leads);
  const history=useHistory();
  if(!leads.error){
  return (
    <div>
      
        {leads.map((element)=>(
            <div> 
           <p>name:{element.name}</p>
           <p>Phone:{element.Phone}</p>
           <p>email:{element.email}</p>
           <p>status:{element.status}</p>
           <p>description:{element.description}</p>
           <button onClick={()=>history.push(`/EditLeads/${element._id}`)}>Edit</button>
           <button onClick={() => {
              fetch(
                "https://hackathon-crm.herokuapp.com/leads/" + element._id,
                { method: "DELETE",headers: { "x-emp-token": localStorage.getItem("token") }}
              ).then(()=>getleads()) ;
            }}>DELETE</button>
         </div>
        ))}
    </div>
  );}
  else{
    return(
      <div>
        You are not authorized
      </div>
    )
  }
}
