import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route ,BrowserRouter,Routes  } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Navbar from './components/Navbar.tsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
