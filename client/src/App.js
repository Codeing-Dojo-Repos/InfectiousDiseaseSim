import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Dashboard from "./components/Dashboard"
import AllUsers from "./components/AllUsers"
import Login from "./components/Login";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/Dashboard' element={ <Dashboard /> } />
          <Route path='/AllUsers' element={ <AllUsers /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
