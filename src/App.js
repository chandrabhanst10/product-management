import './App.css';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {ToastContainer} from 'react-toastify'
import Router from './Components/Router'
import axios from 'axios';
axios.defaults.withCredentials=true

function App() {
  
  return (
    <div className="App">
      <div className="bg-img overflow-auto">
        <ToastContainer toastStyle={{backgroundColor:"transparent",color:"white"}}/>
        <Router/>
        
      </div>
      
    </div>
  );
}

export default App;
