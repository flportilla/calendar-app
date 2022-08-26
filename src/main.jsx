import React from 'react'
import ReactDOM from 'react-dom/client'

import { CalendarApp } from './CalendarApp'
import './styles.css'

//@ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CalendarApp />
  // </React.StrictMode>
)
