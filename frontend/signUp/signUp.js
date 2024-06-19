async function signUp(e){
   try{
    e.preventDefault();
    const signUpDetails={
        name:e.target.name.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        password:e.target.password.value
    }
    console.log("signUpDetails",signUpDetails);
    const response=await axios.post("http://localhost:3000/user/add-user",signUpDetails);
    console.log("response",response);
    if(response.status===201){
        alert(response.message);
        window.location.href="../Login/login.html"  //change the page on successfull login

    }else{
        throw new Error("failed to add new user");
    }
   }
   catch(err){
    document.body.innerHTML+=`<div style="color:red;">${err}</div>`
   }
}