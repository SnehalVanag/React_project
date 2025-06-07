// import axios from 'axios'
// import { createContext } from 'react'
// export const userDataContext = createContext()
// function UserContext({ children }) {
//     const serverUrl = "http://localhost:3000"

//     const value = {
//         serverUrl
//     }
//     return (
//         <div>
//             <userDataContext.Provider value={value}>
//                 {children}
//             </userDataContext.Provider>
//         </div>
//     )
// }

// export default UserContext


import { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [serverUrl] = useState('http://localhost:3000');

  return (
    <MyContext.Provider value={{ serverUrl }}>
      {children}
    </MyContext.Provider>
  );
};
