import './App.css';
import Editer from './component/Editer';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { v4 as uuid } from 'uuid'

function App() {

  return (
  <BrowserRouter>
    <Routes>
          <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`}></Navigate>}/>
          <Route path="/docs/:id" element={<Editer/>}/>
        
    </Routes>
    
  </BrowserRouter>
  );
}

export default App;
