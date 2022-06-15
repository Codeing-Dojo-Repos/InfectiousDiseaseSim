import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<Main/>} /> */}
          {/* <Route path='/edit/:id' element={<Edit />} /> */}
          <Route path='/Dashboard' element={ <Dashboard /> } />
          {/* <Route path='/Enigma' element={ <Enigma /> } /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
