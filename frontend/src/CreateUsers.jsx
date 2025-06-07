import React, { useState ,useContext} from 'react'
import  './CreatUser.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
// import React, { useContext } from 'react'
import { MyContext } from '../src/context/UserContext.jsx';



function CreateUsers() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [age,setAge]=useState("")
    const Navigate =useNavigate()
  const {serverUrl}=useContext(MyContext)


    const handleSubmit = (e)=>{
      e.preventDefault()
      let req={name,email,age}
      // axios.post("http://localhost:3000/creatUser",req)
      axios.post(`${serverUrl}/creatUser`,req)
       Swal.fire({
                          icon: 'success',
                          title: 'Created Successful!',
                          text: 'The user details have been created.',
                          showConfirmButton: false,
                          timer: 2000 // Automatically close after 1.5 seconds
                      }).then(result =>{
        console.log(result)
        Navigate('/')

      })
      .catch(err=>{console.log(err)})
    }

  return (
    <>
   <div className=' d-flex vh-100pc bg-primary align-item-center'>
    <form onSubmit={handleSubmit}>
        <div className='mb-2'>
            <label>Name</label>
            <input type='text' placeholder='enter name' className='form-control' 
            value={name}
            onChange={(e)=>{setName(e.target.value)}}/>
        </div>
         <div className='mb-2'>
            <label>Email</label>
            <input type='text' placeholder='enter email' className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div> 
        <div className='mb-2'>
            <label>age</label>
            <input type='text' placeholder='enter age' className='form-control'
            value={age}
            onChange={(e)=>setAge(e.target.value)}/>
        </div>
        <button className='btn btn-sucesses4'>Submit</button>
       
    </form>

   </div>
    </>
  )
}

export default CreateUsers