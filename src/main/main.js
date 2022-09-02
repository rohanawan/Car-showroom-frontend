import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Signup } from '../components/signup/signup';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
export const Main = () =>{

    return(
      <>
         <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        >
        </ToastContainer>
        <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element= {<Login />} />
          <Route exact path="/home" element= {<Home />} />
        </Routes>
      </Router>
    </>
    )
}