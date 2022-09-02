import React from "react";
import { Button } from "react-bootstrap";

const EditableRow = ({
    handleCancelClick, 
    handleEditButton, 
    editedValue
    }) =>{
    return(
        <>
        <tr>
        <td>
            <input
            type="text"
            placeholder="Enter category..."
            name="name"
            value={editedValue.category}
            onChange={handleEditButton}
            >    
            </input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter color..."
            name="color"
            value={editedValue.color}
            onChange={handleEditButton}
            >    
            </input>
        </td>
        <td>
            <input
            type="text"
            required="required"
            placeholder="Enter model..."
            name="model"
            value={editedValue.model}
            onChange={handleEditButton}
            >
            </input>
        </td>
        <td>
            <input
            type="username"
            required="required"
            placeholder="Enter make..."
            name="make"
            value={editedValue.make}
            onChange={handleEditButton}
            ></input>
        </td>
        <td>
            <input
            type="username"
            required="required"
            placeholder="Enter an registrationNo..."
            name="registraionNO"
            value={editedValue.registraionNO}
            onChange={handleEditButton}
            ></input>
        </td>
        <td>
            <Button className="btn" type="Submit" variant="success">Save</Button>
            <Button className="btn" type="button" variant="light" onClick= {handleCancelClick}>
                Cancel
            </Button>
        </td>
        </tr>
    </>
    )
}

export default EditableRow;