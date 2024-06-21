import './App.css';
import Map from './components/Map';
import { useEffect } from 'react';
import FarmList from './components/FarmList';
import MovementList from './components/MovementList';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FarmForm from './components/FarmForm';
import MovementForm from './components/MovementForm';
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { setAuthState } from './redux/slices/loginSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      dispatch(setAuthState())
    }
  })

  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <div className="App">
      
      
      <Routes>
        <Route path="/farms" element={<FarmList/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/movements' element={<MovementList></MovementList>}></Route>
        <Route path='/farmForm' element={<FarmForm></FarmForm>}></Route>
        <Route path='/movementForm' element={<MovementForm></MovementForm>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/' element={<Login></Login>}></Route>

      </Routes>
      
      </div>
    </div>
    </Router>
    
  );
}

export default App;
