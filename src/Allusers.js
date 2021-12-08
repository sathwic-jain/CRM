//getting all users.
import { useEffect, useState } from "react";
export function Allusers() {
  const [users, setusers] = useState([]);
  const getusers = () => {
    try {
      fetch("https://hackathon-crm.herokuapp.com/users/", {
        method: "GET",
        headers: { "x-manager-token": localStorage.getItem("token") },
      })
        .then((data) => data.json())
        .then((mvs) => setusers(mvs));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(getusers, []);

  if (!users.error) {
    return (
      <div>
        {users.map((element) => (
          <div>
            <p>username:{element.username}</p>
            <p>First name:{element.firstname}</p>
            <p>Last name:{element.lastname}</p>
            <p>type:{element.type}</p>

            {/* <button onClick={()=>history.push(`/EditLeads/${element._id}`)}>Edit</button> */}
            <button
              onClick={() => {
                fetch(
                  "https://hackathon-crm.herokuapp.com/users/" + element._id,
                  {
                    method: "DELETE",
                    headers: { "x-admin-token": localStorage.getItem("token") },
                  }
                ).then((response) => {
                  getusers();
                  if (!response.ok) console.log("error");
                });
              }}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>You are not authorized to access these files</div>;
  }
}
