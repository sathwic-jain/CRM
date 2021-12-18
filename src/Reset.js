import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .required("Enter a valid password")
    .min(5, "Password too short"),
  email: yup.string().required("Enter your email-id"),
});

export function Reset() {
  const [status, setStatus] = useState(null);
  const { resetid } = useParams();
  const history = useHistory();
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "", token: resetid },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        console.log(resetid);
        fetch("https://hackathon-crm.herokuapp.com/users/forgot/reset", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "APPLICATION/JSON" },
        })
          .then((response) => {
            if (response.status === 200) history.push("/Login");
            else if (response.status === 401) setStatus(401);
            else if (response.status === 402) {
              setStatus(402);
              console.log("hello");
            }
            return response.json();
          })
          .then((data) => console.log(data));
      },
    });
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
        {touched.email && errors.email ? <div>{errors.email}</div> : null}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <div>{errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
      {status ? (
        status === 401 ? (
          <div>
            invalid credentials,check the email-id provided or contact the
            administrator
          </div>
        ) : (
          <div>Try changing your own password buddy!!😒</div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
