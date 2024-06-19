async function login(e){
    try{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;

        const loginDetails={
            email,
            password
        }
        console.log(loginDetails);
        const response=await axios.post("http://localhost:3000/user/login",loginDetails);
        console.log(response.data);
        if(response.status===200){
             localStorage.setItem("token",response.data.token)
            console.log("response from login controller",response);
            alert(response.data.message);
             window.location.href="../chat-window/chat-window.html"  //change the page on successfull login

        }
    }
    catch(err){
        console.log(err);

    }
}