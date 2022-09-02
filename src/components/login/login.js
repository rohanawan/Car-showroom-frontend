import React from "react";
import {Row , Col , Container , Form , Button ,Spinner} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export const Login = () =>{
    let api = 'http://localhost:4000/v1/auth'
    // page navigation
    const navigate = useNavigate();
    // initializing states
    const [ loading , setLoading ] = useState(false);
    const [formValue , setFormValue] = useState({
        email : '',
        password: ''
    });
    // Storing feild's value in state
    const handleNameChange=(e)=>{
        e.preventDefault();
        const feildName = e.target.getAttribute("name");
        const feildValue = e.target.value;
        const feildData = {...formValue};
        feildData[feildName] = feildValue;
        setFormValue(feildData);
    }
    // SUMBITING data through login api
    const onFormSubmit =  async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const url = `${api}/login`;
            const response = await axios.post(url , formValue);
            if (response.status === 200) {
                toast.success("Login successFully", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
            }
            navigate('/home');
        }catch(error){
            toast.error("Incorrect Email or Password ", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            setLoading(false);
        }   
    }

    useEffect(()=>{
        onFormSubmit();
    },  []);
    return (
    <Container className="form-mid">
        <Row className="d-flex justify-content-lg-center align-items-center vh-100 ">
        <Col lg={4} md={4} sm={4} className='border border-2 rounded p-4 form-bg'>
                  <Form className='pb-2' onSubmit={onFormSubmit}>
                      <Form.Label className='d-flex justify-content-center mt-6 fw-bold fs-3 white'>LOGIN</Form.Label>
                      <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label className='mt-2 pt-1 white'>Email :</Form.Label>
                          <Form.Control required type="email" placeholder="Enter Your Email :" name="email" onChange={handleNameChange}/>
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicPassword">
                          <Form.Label className='mt-2 pt-1 white'>Password :</Form.Label>
                          <Form.Control required type="password" placeholder="Enter Password :" name="password" onChange={handleNameChange}/>
                      </Form.Group>
                    {!loading ? 
                        (<div className="d-flex justify-content-center algin-center mt-4 ">
                        <Button className="reg-btn white" variant="primary" type="submit">
                        Login
                        </Button>
                    </div>)
                    : 
                    (
                        <div className="d-flex justify-content-center algin-center mt-4 ">
                        <Button className="reg-btn" variant="primary" type="submit">
                        <Spinner animation="border"  size="md" role="status"/>
                        </Button>
                        </div>
                    )}
                </Form>
            </Col>  
        </Row>
    </Container>
    )
}