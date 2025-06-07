import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyContextProvider } from './context/UserContext.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    // <App />
  // </StrictMode>,
  //  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  // </React.StrictMode>

)
