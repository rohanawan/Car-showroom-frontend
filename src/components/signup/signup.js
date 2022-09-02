import React from "react";
import {Row , Col , Container , Form , Button ,Spinner , Alert} from 'react-bootstrap';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

export const Signup = () =>{
    let api = 'http://localhost:4000/v1/auth';
    // page nanvigation
    const navigate = useNavigate();
    // initilizing state
    const [ loading , setLoading ] = useState(false);
    const [show, setShow] = useState(false);
    const [formValue , setFormValue] = useState({
        name : '',
        email: '',
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
    // SUMBITING data through register api
    const onFormSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const url = `${api}/register`;
            const response = await axios.post(url , formValue);
            if (response.status === 200) {
                toast.success("SignUp successFully", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
            }
            setLoading(false);
            setShow(true);
        }catch(error){
            toast.error("Incorrect creds !!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
            setLoading(false);
        }   
    }
    //pop up button
    const handleButton =()=>{
        setShow(false);
        navigate('/login')
    }
    return (
    <Container className="">
        <Row className="d-flex justify-content-lg-center align-items-center vh-100">
            <Col lg={4} md={4} sm={4} className='border border-2 rounded p-4 form-bg'>
                  <Form className='pb-2' onSubmit={onFormSubmit}>
                      <Form.Label className='d-flex justify-content-center mt-6 white fw-bold fs-3'>SIGN UP</Form.Label>
                      <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label className='mt-2 white'>Name :</Form.Label>
                          <Form.Control type="text" placeholder="Enter Your Name :"  name="name" onChange={handleNameChange} required/>
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label className='mt-2 pt-1 white'>Email :</Form.Label>
                          <Form.Control type="email" placeholder="Enter Your Email :" name="email" onChange={handleNameChange} required />
                      </Form.Group>
                    <div className="justify-content-center algin-center mt-4 ">
                        <input 
                        type="checkbox"  
                        className="checkbox m-2"
                        />
                        <label className="white"> I agree to all terms and conditions</label>
                    </div>
                    {!loading ? (
                    <div className="d-flex justify-content-center algin-center mt-4 ">
                        <Button className="reg-btn white" variant="primary" type="submit">
                        Register
                        </Button>
                    </div>
                    ) : (
                        <div className="d-flex justify-content-center algin-center mt-4 ">
                        <Button className="reg-btn" variant="primary" type="submit">
                        <Spinner animation="border"  size="md" role="status"/>
                        </Button>
                        </div>
                    )}
                    <div className="justify-content-center algin-center mt-4 white">
                        Do you already Have an account ? <a href="/login">Login Here</a>
                    </div>
                </Form>
            </Col>  
            {show ?
                    (
                    <Alert className="alertPopup" show={show} variant="success">
                        <Alert.Heading>Email Sent !!</Alert.Heading>
                        <p>
                        Please Check your Email. We have send you an Email with password to login.
                        If not then check spam
                        </p>
                        <hr />
                        <div className="d-flex justify-content-center">
                        <Button onClick={handleButton} variant="outline-success">
                            Got it                             
                        </Button>
                        </div>
                    </Alert>
                    ) :
                    ('')
            }
        </Row>
    </Container>
    )
}