import React, { Fragment } from 'react';
import { Button , Form , Row , Col , Table , Spinner } from 'react-bootstrap';
import { useState } from 'react';
import EditableRow from '../editablerow/Editable';
import ReadOnlyRow from '../readonlyrow/ReadOnlyRows';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export const Home = () => {
    let api = 'http://localhost:4000/v1';
    // page navigation 
    const navigate = useNavigate();
    // initializing states 
    const [data , setData] = useState([]);
    const [loader , setLoader] = useState(false);
    const [editId , setEditId] = useState(null);
    const [search , setSearch] = useState('');
    const [category , setCategory] = useState([]);
    const [formValue , setFormValue] = useState({
        category:'',
        color:'',
        model:'',
        make:'',
        registraionNO:''
    });
    const [editedValue , setEditedValue] = useState({
        color:'',
        model:'',
        make:'',
        registraionNO:''
    });
    // Changing CAR form feilds, data will store in state
    const handleFormChange =(e)=> {
        e.preventDefault();
        const feildName = e.target.getAttribute("name");
        const feildValue = e.target.value;
        const feildData = {...formValue};
        feildData[feildName] = feildValue; 
        setFormValue(feildData);
    }
    //Posting form data using api
    const handleSubmit = async (e) =>{
        setLoader(true);
        let url = `${api}/cars`;
        const { data } = await axios.post(url, formValue);
        setLoader(false);
        setFormValue(data);
        setFormValue({
            category:'',
            color:'',
            model:'',
            make:'',
            registraionNO:''
        })
    }
    // on clicking edit button in table this function will trigger
    const handleEditClick = (event, data) => {
        event.preventDefault();
        setEditId(data.id);
        const formValues = {
            category: data.category,
            color : data.color,
            model : data.model,
            make : data.make,
            registraionNO : data.registraionNO
        };
        setEditedValue(formValues);
    }
    //on change edit feild values this will store data in state
    const handleEditButton = (e) => {
        e.preventDefault();
        const editFeild = e.target.getAttribute('name');
        const editValue = e.target.value;
        const editData = { ...editedValue};
        editData[editFeild] = editValue;
        setEditedValue(editData);
    }
    //posting edit data using api
    const handleEditSubmitButton = async (e) =>{
        setLoader(true);
        await axios.patch(`${api}/cars/${editId}`, editedValue)
        .then((res)=>{
            setData(res.data);
        })
        .catch(error => {
            console.error('There was an error!', error)
        })
        setEditId(null)
        setLoader(false);
        getCarsApiCall();        
    }
    // deleting data using api
    const handleDeleteButton = async (id) => {
        setLoader(true);
        await axios.delete(`${api}/cars/${id}`)
        .then((res)=>{
            setData(res.data);
        })
        .catch(error => {
            console.error('There was an error!', error)
        })
        setLoader(false);        
        getCarsApiCall();
    }
    // Api call to get car categories
    const getCategoryApiCall = async (id) =>{
        setLoader(true);
        try{
            const url = `${api}/categories`;
            const { data }  = await axios.get(url);
            setCategory(data)
        }catch(e){
            console.error('There was an error!', e)
        }
        setLoader(false); 
    }
    // Api call to get cars
    const getCarsApiCall = async (e) =>{
        try{
            const url = `${api}/cars`;
            const { data }  = await axios.get(url);
            setData(data)      
            console.log(data)  
        }catch(e){
            console.log(e);
        }
    }
    // setting state on clicking Cancel button in table
    const handleCancelClick = () => {
        setEditId(null);
    };
    // Logout button function
    const handleLogout = () =>{
        toast.success("Logout successFully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        navigate('/');
    }
    // calling api's in useffect
    useEffect(()=>{
        getCarsApiCall();
        getCategoryApiCall();
    },[]);
    return(
    <Row className="d-flex justify-content-center m-0 home-hero-section">
        <div className='d-flex justify-content-between pb-4 pt-4'>
          <div></div>
          <div>        
            <h1 className='d-flex justify-content-center white pd'> CAR SHOWROOM </h1>
          </div>
          <div>
          <Button className='d-flex justify-content-end' onClick={handleLogout}>
                Logout
          </Button>
          </div>  
        </div>
        <Row lg={4}  className='d-flex justify-content-center'>
          <Col className='form form-bg rounded border p-4'>
            <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" controlId="formBasicEmail" >
                      <Form.Label className='white'> Cars Category :</Form.Label>
                        <select className='d-flex w-100 p-2 rounded drop-down' name="category" 
                            onChange={handleFormChange} 
                            value={formValue.category}>
                            {category?.results?.map((options , id)=>{
                                return <option value={options.id} key={id}>
                                    {options.name}
                                </option>
                            })}                
                        </select>
                    </Form.Group>
                    
                    <Form.Group className="mb-2" controlId="formBasicEmail" >
                        <Form.Label className='white'>Color :</Form.Label>
                        <Form.Control type="name" name="color" placeholder="Enter Colour" required 
                        value={formValue.color} 
                        onChange={handleFormChange}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label className='white'>Model</Form.Label>
                        <Form.Control type="model" name ="model" placeholder="Model" required 
                        value={formValue.model} 
                        onChange={handleFormChange} />
                    </Form.Group>
                    
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label className='white'>Make</Form.Label>
                        <Form.Control type="make" name ="make" placeholder="Make" required 
                        value={formValue.make}
                        onChange={handleFormChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='white'>Registeration #</Form.Label>
                        <Form.Control type="registraionNO" name ="registraionNO" placeholder="Registeration #" 
                        value={formValue.registraionNO}
                        onChange={handleFormChange}
                        required
                        />
                    </Form.Group>

                <div className='d-flex justify-content-center'>
                <Button variant="primary" type="submit" className="d-flex justify-content-center mb-4 w-100">
                    ADD
                </Button>
                </div>
            </Form>
          </Col>
        </Row>
        <hr className=''/>
      <Row className='d-flex justify-content-center'>
        <Col lg={10}>
        {loader ?  
            <div className='d-flex justify-content-center'>
                <span className='loading white'>Loading ...</span>
                <Spinner animation="grow" className='white'/>
            </div>
            :   
        <Form onSubmit={handleEditSubmitButton}>
            <div className='d-flex justify-content-between'>
            <div>
            <label className='pr-2 search white'>
                Search :
            </label>
            <input
                type="search"
                placeholder="Search"
                name="search"
                className="p-1 mb-1 rounded"
                onChange={(e)=> setSearch(e.target.value)}
            ></input>
            </div>
            <div>
            <label className='pr-2 search white'>
                Total Registered Cars : {data.totalResults}
            </label>
            </div>
            </div>
            <Table bordered className='form-table'>
            <thead>
                <tr>
                <th className='table-white'>Category</th>
                <th className='table-white'>Color</th>
                <th className='table-white'>Model</th>
                <th className='table-white'>Make</th>
                <th className='table-white'>RegisterationNo</th>
                </tr>
            </thead>
            
            <tbody>
            {data.results?.filter((value) => {
                if(search === ""){
                    return value;
                }else if (value.color.toLowerCase().includes(search.toLowerCase())){
                    return value;
                }
                else if (value.model.toLowerCase().includes(search.toLowerCase())){
                    return value;
                }
                else if (value.make.toLowerCase().includes(search.toLowerCase())){
                    return value;
                }
                else if (value.registraionNO.toLowerCase().includes(search.toLowerCase())){
                    return value;
                }
            }).map(dataa => (
            <Fragment>
            {editId === dataa.id ?
                ( 
                <EditableRow 
                editedValue = {editedValue}
                handleEditButton = {handleEditButton}
                handleCancelClick = {handleCancelClick}
                />
                )
                :
                ( 
                <ReadOnlyRow
                category = {category}
                dataa = {dataa}
                handleEditClick = {handleEditClick}
                handleDeleteButton = {handleDeleteButton}
                />
                )
                }
                
            </Fragment>
            ))}
            </tbody>
            </Table>
        </Form>
        }
      </Col>
      </Row>
      </Row>
    )

}