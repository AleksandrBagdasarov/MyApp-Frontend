import { Header } from "./components/Header";
import { Index } from "./components/Index";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Game } from "./components/Game";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index/>}/>
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
          <Routes>
            <Route path="/game" element={<Game/>}/>
          </Routes>
        </BrowserRouter>
}

export default App;
