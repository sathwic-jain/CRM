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
    <div className="leads">
      
        {leads.map((element)=>(
            <div className="eachlead"> 
           <p><b>Name:</b> {element.name}</p>
           <p><b>Phone:</b> {element.Phone}</p>
           <p><b>Email:</b> {element.email}</p>
           <p><b>Status:</b> {element.status}</p>
           <p><b>Description:</b> {element.description}</p>
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
