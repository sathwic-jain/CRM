import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import {useHistory} from "react-router-dom";

const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(7, "Provide a longer email")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "pattern does not match"
    ),
    name:yup.string().required("Enter the name"),
    Phone:yup.string().required("Enter the Phone number").min(10,"Enter a proper number"),
    description:yup.string().required("Describe the event in a few words").min(15,"shortage of words")
});

export function AddLeads() {
    const history=useHistory();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "",name:"",status:"",Phone:"",description:"" },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
       values.status=status;
        console.log("onSubmit", values);
        fetch("https://hackathon-crm.herokuapp.com/leads/add", {
            method: "POST",
            body:JSON.stringify(values),
            headers:{"Content-Type":"APPLICATION/JSON", "x-emp-token": localStorage.getItem("token") }
          }).then(()=>{
            history.push("/Leads");
          });
      },
    });
  const [status, setstatus] = useState("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email "
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.name && errors.name ? <div>{errors.name}</div> : null}

        <input
          type="name"
          id="name"
          name="name"
          placeholder="Enter your name "
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}

        <input
          type="Phone"
          id="Phone"
          name="Phone"
          placeholder="Enter the Phone number"
          value={values.Phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.Phone && errors.Phone ? <div>{errors.Phone}</div> : null}
        <div className="checkbox">
          <select id="colors">
            <option onClick={()=>setstatus("New")}>New</option>
            <option onClick={()=>setstatus("Contacted")}>Contacted</option>
            <option onClick={()=>setstatus("Qualified")}>Qualified</option>
            <option onClick={()=>setstatus("Lost")}>Lost</option>
            <option onClick={()=>setstatus("Cancelled")}>Cancelled</option>
            <option onClick={()=>setstatus("Confirmed")}>Confirmed</option>
          </select>
        </div>

        <input
          type="description"
          id="description"
          name="description"
          placeholder="Enter the Description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.description && errors.description ? <div>{errors.description}</div> : null}
      
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
