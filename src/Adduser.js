import { useFormik } from "formik";
import * as yup from "yup";
import {useState} from "react";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .required("kindly enter the password")
    .min(7, "Provide a longer email")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "pattern does not match"
    ),
  password: yup
    .string()
    .required("kindly enter the password")
    .min(8, "Password too short")
    .max(20, "Password too long"),
    firstname:yup.string()
    .required("Provide a first name"),
    lastname:yup.string()
    .required("Provide a last name")
});

export function Adduser() {
  const [position,setPosition] =useState("New");
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { username: "", password: "",type:"",firstname:"",lastname:"" },
      validationSchema: formValidationSchema,
     
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
        {touched.username && errors.username ? <div>{errors.username}</div> : null}

        <input
          type="firstname"
          id="firstname"
          name="firstname"
          placeholder="Enter your firstname "
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.firstname && errors.firstname ? <div>{errors.firstname}</div> : null}

        <input
          type="lastname"
          id="lastname"
          name="lastname"
          placeholder="Enter your lastname "
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.lastname && errors.lastname ? <div>{errors.lastname}</div> : null}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter the password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <div>{errors.password}</div>
        ) : null}
        
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
        <button type="submit" onClick={()=>{
         
          values.type=position;
          console.log(values);
          fetch("https://hackathon-crm.herokuapp.com/users/add", {
        method: "POST",
        body:JSON.stringify(values),
        headers:{"Content-Type":"APPLICATION/JSON"}
      }).then((response)=>{console.log(response)
      })}}>Add</button>
      </form>
    </div>
  );
}
// function adding(values,type){
//     console.log(values);
//     fetch("https://hackathon-crm.herokuapp.com/users/add", {
//         method: "POST",
//         body:JSON.stringify(values),
//         headers:{"Content-Type":"APPLICATION/JSON"}
//       }).then((response)=>{console.log(response)
//       });
// }