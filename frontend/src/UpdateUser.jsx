// // import { useState,useEffect } from 'react'
// // import React from 'react'
// // import { useParams } from 'react-router-dom'
// // import { useNavigate } from 'react-router-dom'
// // import axios from 'axios'
// // function UpdateUser() {
// //     const {id}=useParams()
// //         const [name,setName]=useState("")
// //       const [email,setEmail]=useState("")
// //       const [age,setAge]=useState("")
// //       const Navigate =useNavigate()

// //          useEffect(()=>{
// //             axios.get(`http://localhost:3000/getuser/${id}`)
// //             .then(resu => {
// //               setName(resu.data.name)
// //               setEmail(resu.data.email)
// //               setAge(resu.data.age)
// //             })
// //             .catch(err=>console.log(err))
// //           },[])

// //      const updateUs = (e) =>{
// //       console.log("hhhh")
// //       // e.preaventDefault()

// //       //   let req={name,email,age}

// //       //   console.log(req)
// //       // axios.put(`http://localhost:3000/updateUser${id}`,req)
// //       // .then(result =>{
// //       //   console.log(result)
// //       //   Navigate('/')
     

// //       // })
// //       // .catch(err=>{console.log(err)})
// //           }
 
// //   return (
// // <>
// //     <div>UpdateUser</div>
// //        <div className=' d-flex vh-100pc bg-primary align-item-center'>
// //     <form  onSubmit={updateUs} >
// //         <div className='mb-2'>
// //             <label>Name</label>
// //             <input type='text' placeholder='enter name' className='form-control' 
// //             value={name}
// //             onChange={(e)=>{setName(e.target.value)}}/>
// //         </div>
// //          <div className='mb-2'>
// //             <label>Email</label>
// //             <input type='text' placeholder='enter email' className='form-control'
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}/>
// //         </div> 
// //         <div className='mb-2'>
// //             <label>age</label>
// //             <input type='text' placeholder='enter age' className='form-control'
// //             value={age}
// //             onChange={(e)=>setAge(e.target.value)}/>
// //         </div>
// //         <button>update </button>
       
// //     </form>

// //    </div>
// // </>
// //   )
// // }

// // export default UpdateUser


// import { useState, useEffect } from 'react'
// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom' // Correct import for useNavigate
// import axios from 'axios'
// import SimplePopup from './modal/modal.jsx'

// function UpdateUser() {
//     const { id } = useParams()
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [age, setAge] = useState("")
//     const Navigate = useNavigate() // Correct capitalization for the hook result
//     const [showWelcomePopup, setShowWelcomePopup] = useState(false);

//       const handleOpenPopup = () => {
//     setShowWelcomePopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowWelcomePopup(false);
//   };


//     useEffect(() => {
//         // Fetch user data when component mounts
//         axios.get(`http://localhost:3000/getuser/${id}`)
//             .then(resu => {
//                 setName(resu.data.name)
//                 setEmail(resu.data.email)
//                 setAge(resu.data.age)
//             })
//             .catch(err => console.log(err))
//     }, []) // Add 'id' to dependency array to re-fetch if ID changes

//     const updateUs = (e) => {
//         console.log("Submit button clicked!")
//         e.preventDefault() // <-- THIS IS THE KEY FIX: Prevent page refresh

//         let req = { name, email, age } // Create the request body

//         console.log("Request payload:", req) // Log the data being sent
//         axios.put(`http://localhost:3000/updateUser/${id}`, req) // Corrected URL with backticks and proper path
//             .then(result => {
//                 console.log("Update successful:", result)
             
//                 Navigate('/') // Navigate to home after successful update
//             })
//             .catch(err => {

//                 console.error("Error updating user:", err) // Use console.error for errors
//             })
//     }

//     return (
//         <>
//             <div>UpdateUser</div>
//             <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'> {/* Added justify-content-center and align-items-center for centering */}
//                 <div className="w-50 bg-white rounded p-3"> {/* Added a wrapper div for styling */}
//                     <form onSubmit={updateUs}>
//                         <h2>Update User</h2> {/* Changed to Update User */}
//                         <div className='mb-2'>
//                             <label>Name</label>
//                             <input type='text' placeholder='enter name' className='form-control'
//                                 value={name}
//                                 onChange={(e) => { setName(e.target.value) }} />
//                         </div>
//                         <div className='mb-2'>
//                             <label>Email</label>
//                             <input type='text' placeholder='enter email' className='form-control'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         <div className='mb-2'>
//                             <label>Age</label>
//                             <input type='text' placeholder='enter age' className='form-control'
//                                 value={age}
//                                 onChange={(e) => setAge(e.target.value)} />
//                         </div>
//                         <button className="btn btn-success">Update</button> {/* Added button styling */}

//                     </form>
//                        {showWelcomePopup && (
//         <SimplePopup
//           message="Hello! This is a simple and beautiful popup."
//           onClose={handleClosePopup}
//         />
//       )}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default UpdateUser




import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { MyContext } from '../src/context/UserContext.jsx';

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
  const {serverUrl}=useContext(MyContext)

    useEffect(() => {
        axios.get(`${serverUrl}/getUser/${id}`)
            .then(result => {
                console.log(result.data);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch(err => console.error(err));
    }, [id]);

    const updateUs = (e) => {
        console.log("Submit button clicked!");
        e.preventDefault(); // Prevent page refresh

        let req = { name, email, age }; // Create the request body

        console.log("Request payload:", req); // Log the data being sent
        axios.put(`${serverUrl}/updateUser/${id}`, req) // Corrected URL with backticks and proper path
            .then(result => {
                console.log("Update successful:", result);

                // --- OPTION 1: Using SweetAlert2 for a nice popup ---
                Swal.fire({
                    icon: 'success',
                    title: 'Update Successful!',
                    text: 'The user details have been updated.',
                    showConfirmButton: false,
                    timer: 2000 // Automatically close after 1.5 seconds
                }).then(() => {
                    navigate('/'); // Navigate to home after the popup closes
                });

                // --- OPTION 2: Using a simple browser alert (less fancy) ---
                // alert('User updated successfully!');
                // navigate('/'); // Navigate to home after successful update
            })
            .catch(err => {
                console.error("Error updating user:", err); // Use console.error for errors

                // Display an error popup
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed!',
                    text: 'There was an error updating the user. Please try again.',
                });
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={updateUs}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Age</label>
                        <input type='text' placeholder='Enter Age' className='form-control'
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;