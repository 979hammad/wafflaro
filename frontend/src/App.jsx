import NavBar from "./Components/NavBar/MainNav/NavBar"
import DisplayCards from "./Components/Home/DisplayCards/DisplayCards"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
      <Toaster />
      <NavBar/>
      <Routes>
        <Route path="/" element={<DisplayCards />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
