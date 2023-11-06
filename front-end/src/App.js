import './App.css';
import { Route,Routes } from "react-router-dom";
import User from './components/getuser/User.jsx';
import Add from './components/adduser/Add.jsx';
import Edit from './components/updateuser/Edit';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<User/>}/>
        <Route  path='/add' element={<Add/>}/>
        <Route  path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
