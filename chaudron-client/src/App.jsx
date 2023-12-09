import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Home from './home.jsx'
import Layout from './layout.jsx'
import NoPage from './nopage';
import Recipe from './recipe';
import Login from './login';
import Register from './register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";


function App() {
  return (
    <div>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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

