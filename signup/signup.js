async function savetoserver(event){
    event.preventDefault()
    const Name=event.target.name.value
    const Email=event.target.email.value
    const Password=event.target.password.value

    const details={
        Name,
        Email,
        Password
    }

    try{
        const response=await axios.post('http://localhost:3000/User/Add-user',details)

if(response.status==201)
{
    window.location.href="../login/login.html"
}

      // showUserOnScreen(response.data.newuserdetails);
       console.log(response.status)
        console.log(response.data.newuserdetails);
    }
     catch (err) {
        console.log(err);
    }
    
}

async function refresh() {
    try {
        const response = await axios.get('http://localhost:3000/User/Get-user');
        console.log(response)
        
        for (const user of response.data.allusers) {
            console.log(user)
            //showUserOnScreen(user);
        }
    } catch (err) {
        console.log(err);
    }
}

function showUserOnScreen(user){

    const parentelement=document.getElementById('users')
    const childelement=document.createElement('li')
    childelement.textContent=user.name+ '|' + user.email +  '|' +user.phonenumber

    const deletebtn=document.createElement('button')
    const editbtn=document.createElement('button')

    
    deletebtn.textContent='delete'
    editbtn.textContent='edit'
    
    deletebtn.onclick= async()=>{
        try{
       await axios.delete(`http://localhost:3000/User/Delete-user/${user.id}`)
         console.log('userdeleted:',user)
         
        }
        catch(err) {
            console.log(err)
        }


        parentelement.removeChild(childelement)
    }

    editbtn.onclick=async()=>{
        try{
        await axios.delete(`https://crudcrud.com/api/4763f742ff4c4343b4420c4713d500ca/adminpage/${details._id}`)

            console.log('edituser:',details)
        }
        catch(err){
            console.log(err)
        }
        parentelement.removeChild(childelement)
        document.getElementById('name').value=details.Name
        document.getElementById('email').value=details.Email
        document.getElementById('contact').value=details.Contact
    }
    childelement.appendChild(deletebtn)
    childelement.appendChild(editbtn)

    parentelement.appendChild(childelement)

}

//window.addEventListener('DOMContentLoaded', refresh)