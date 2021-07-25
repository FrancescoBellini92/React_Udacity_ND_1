import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { StoreContext } from './components/utils/StoreContext'
import './index.css'

ReactDOM.render(<StoreContext><App /></StoreContext>, document.getElementById('root'))
