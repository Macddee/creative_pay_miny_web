import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from './theme/theme'
import {ThemeProvider} from 'styled-components'
import GlobalStyle from './theme/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
  </React.StrictMode>,
)




