import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Home from './home.jsx'
import Layout from './layout.jsx'
import NoPage from './nopage';
import Recipe from './recipe';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recettes/*" element={<Recipe/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

///const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />);

export default App

