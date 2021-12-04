import { useFormik } from "formik";
import { useState} from "react";


export function Basicform() {
  const [position,setPosition] =useState(null);
 
  // const [change,setchange]=useState(null);

  // useEffect((values,setType)=>{
  //   login(values,setType);
   
  // },[change]);
 
  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: { username: "", password: "",type:"" },
    
    onSubmit: (values) => {
        values.type=position;
      console.log(values);
    
    },

  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="Enter your email "
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter the password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
        type="radio"
        id="auth"
        onClick={()=>setPosition("Administrator")}
        checked={position==="Administrator"?true:false}
        />
        <label for="auth">Administrator</label>
        
        <input
        type="radio"
        id="manager"
        onClick={()=>setPosition("Manager")}
        checked={position==="Manager"?true:false}
        />
        <label for="manager">Manager</label>

        <input
        type="radio"
        id="employee"
        onClick={()=>setPosition("employee")}
        checked={position==="employee"?true:false}
        />
        <label for="employee">Employee</label>
        <button type="submit" onClick={()=>{fetch("https://hackathon-crm.herokuapp.com/users/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "APPLICATION/JSON" },
      }).then((response) => console.log(response))}
    }>Login</button>
      </form>
    </div>
  );

}

// function login(values,setType){
//     console.log(values);
//     if(values.username!==""){
//     fetch("https://hackathon-crm.herokuapp.com/users/login", {
//         method: "POST",
//         body: JSON.stringify(values),
//         headers: { "Content-Type": "APPLICATION/JSON" },
//       })
//         .then((response) => (response.ok ? (alert("Successful"),setType(values.type)) : alert("invalid credentials")));
       
//         } 
// }