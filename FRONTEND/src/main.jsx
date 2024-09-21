import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './/Owner/Admin.css'


import './Style/navbarmain.css'
import './Style/careerpage.css'
import './Style/navbar2career.css'
import './Style/careerpagefooter.css'



import { ApplicationStatusProvider } from './ApplicationStatusContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ApplicationStatusProvider>
      <App />
    </ApplicationStatusProvider>
  </React.StrictMode>,
)
