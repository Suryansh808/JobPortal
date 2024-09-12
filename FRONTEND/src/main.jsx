import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import './/Recruitment/career.css'
import './/Owner/Admin.css'



import { ApplicationStatusProvider } from './ApplicationStatusContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ApplicationStatusProvider>
      <App />
    </ApplicationStatusProvider>
  </React.StrictMode>,
)
