

export function Forgot({email,setemail}) {
    
    
  return (
    <div>
      <form>
        <input
          type="username"
          id="username"
          placeholder="Enter your email-id"
          onChange={(event)=>setemail(event.target.value)} />
       
      </form>
      <button onClick={()=>{
           fetch("https://hackathon-crm.herokuapp.com/users/forgot", {
            method: "POST",
            body: JSON.stringify({username:email}),
            headers: { "Content-Type": "APPLICATION/JSON" },
          })
            .then((response) => {
              return response.json();
            }).then((data)=>{localStorage.setItem(`${email}`,data.token)
          console.log("hello")});
      }}>Submit</button>
    </div>
  );
}
