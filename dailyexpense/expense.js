

async function expense(event){
    event.preventDefault()
    const Price=parseFloat(event.target.price.value)
    const Name=event.target.name.value
    const Category=event.target.category.value


    const expense={
        Price,
        Name,
        Category
    }

    try{
        const response=await axios.post('http://localhost:3000/Expense/Add-expense',expense)

       // showUserOnScreen(response.data.expense);
        console.log(response);

        event.target.price.value = '';
        event.target.name.value = '';
        event.target.category.value = '';

    }
     catch (err) {
        console.log(err);
    }
    
}


async function refresh() {
    try {
        const response = await axios.get('http://localhost:3000/Expense/Get-expense');
        
        for (const expense of response.data.allexpense) {
            showUserOnScreen(expense);
            console.log(expense)
        }
    } catch (err) {
        console.log(err);
    }
}

function showUserOnScreen(expense){

    const parentelement=document.getElementById('listitem')
    
    

    const childelement=document.createElement('li')
    childelement.textContent=expense.price+ '|' + expense.name +  '|' +expense.category

    const deletebtn=document.createElement('button')
    const editbtn=document.createElement('button')

    deletebtn.textContent='delete'
    editbtn.textContent='edit'

    deletebtn.classList.add('delete-btn'); 
    editbtn.classList.add('edit-btn');   
    
    deletebtn.onclick= async()=>{
        try{
       await axios.delete(`http://localhost:3000/Expense/Delete-expense/${expense.id}`)
         console.log('userdeleted:',expense)
        }
        catch(err) {
            console.log(err)
        }


        parentelement.removeChild(childelement)
    }

    editbtn.onclick=async()=>{
        try{
        await axios.delete(`http://localhost:3000/User/Delete-user/${expense.id}`)

            console.log('edituser:',details)
        }
        catch(err){
            console.log(err)
        }
        parentelement.removeChild(childelement)
        document.getElementById('price').value=details.Price
        document.getElementById('name').value=details.Name
        document.getElementById('category').value=details.Category
    }
    childelement.appendChild(deletebtn)
    childelement.appendChild(editbtn)
    if(parentelement){
    parentelement.appendChild(childelement)
    }

}

window.addEventListener('DOMContentLoaded', refresh)