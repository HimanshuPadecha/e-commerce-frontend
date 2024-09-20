import './App.css'
import { Outlet } from 'react-router-dom'
import { Nav,Footer } from './components'


function App() {

  return (
    <>
     <Nav/>
     <Outlet/>
     <Footer />
    </>
  )
}

export default App
