import axios from 'axios'
// import React, { useState } from 'react'
import { useEffect,useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { MyContext } from '../src/context/UserContext.jsx';


function Users() {

    const [user,setUser] = useState([{
        "name":"snehal",
        "email":"snehal@gmail.com",
        "age":"23"
    }])
      const {serverUrl}=useContext(MyContext)
    
    useEffect(()=>{
      axios.get(`${serverUrl}`)
      
      .then(resu=>setUser(resu.data))
      .catch(err => console.log(err)); 

    },[])

  //  const handleDelte = (id)=>{
  //   console.log("clicked on delete")
  //   axios.delete('http://localhost:3000/deleteuser/'+id)
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err))
  //  }
   const handleDelete = (id) => { // Renamed to 'handleDelete' for consistency with React naming conventions
        console.log("Delete button clicked for ID:", id); // Log to confirm ID is received

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${serverUrl}/deleteuser/${id}`)
                    .then(res => {
                        console.log("Delete successful:", res);
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        // Update the state to remove the deleted user from the list
                        // setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                        // setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                        window.location.reload()
                    }).then(() => {
                    navigate('/'); // Navigate to home after the popup closes
                });
                    // .catch(err => {
                    //     console.error("Error deleting user:", err);
                    //     Swal.fire(
                    //         'Error!',
                    //         'There was a problem deleting the user.',
                    //         'error'
                    //     );
                    // });
            }
        });
    };

  return (
    <>
     <div>Users</div>
           <Link to='/createuser' className='btn btn-sucsess'><button>Add user</button></Link>

     <table>
      <thead>
        <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Age</td>
        </tr>
      </thead>
      <tbody>
        {user.map((user) => (
          <tr >
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td><Link to={`/updateuser/${user._id}`}><button>update</button></Link>&nbsp;&nbsp;
              <button
                                            onClick={(e) => handleDelete(user._id)} // Correct onClick handler
                                            className='btn btn-sm btn-danger'
                                        >
                                            Delete
                                        </button></td>
     
            
          </tr>
        ))}

      </tbody>
     </table>
    </>
   

  )
}

export default Users