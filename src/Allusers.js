//getting all users.
import {useEffect,useState} from "react";
export function Allusers() {
  const [users,setusers]=useState([]);
  const getusers=()=>{fetch("https://hackathon-crm.herokuapp.com/users/",{method:"GET"})
  .then((data) => data.json())
  .then((mvs) => setusers(mvs))};
  useEffect(getusers,[]);
  console.log(users);
  // var type=localstorage.getItem("type");
  // console.log(type);
  return (
    <div>
      
        {users.map((element)=>(
            <div> 
           <p>username:{element.username}</p>
           <p>First name:{element.firstname}</p>
           <p>Last name:{element.lastname}</p>
           <p>type:{element.type}</p>
           
           {/* <button onClick={()=>history.push(`/EditLeads/${element._id}`)}>Edit</button> */}
           <button onClick={() => {
              fetch(
                "https://hackathon-crm.herokuapp.com/users/"+element._id,
                { method: "DELETE" }
              ).then(()=>getusers()) ;
            }}>DELETE</button>
         </div>
        ))}
    </div>
  );
}