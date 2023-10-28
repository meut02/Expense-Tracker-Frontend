async function login(event){
    event.preventDefault()
    const Email=event.target.email.value
    const Password=event.target.password.value

    const logindetails={
        Email,
        Password
    }

    try{
        const response=await axios.post('http://localhost:3000/User/Login',logindetails)

       console.log(response.status)
        console.log(response)
    }
     catch (err) {
        console.log(err);
    }
    
}
