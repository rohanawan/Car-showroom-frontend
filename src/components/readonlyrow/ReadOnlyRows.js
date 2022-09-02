import React from "react"
import { Button } from "react-bootstrap";

const ReadOnlyRow = ({dataa , handleEditClick , handleDeleteButton , category}) =>{
    return (
        <>
            <tr>
                {category?.results.map((options)=>{
                    return dataa.category === options.id ? dataa.category = options.name : ''  
                })}
              <td className='table-white'>{dataa.category}</td>
              <td className='table-white'>{dataa.color}</td>
              <td className='table-white'>{dataa.model}</td>
              <td className='table-white'>{dataa.make}</td>
              <td className='table-white'>{dataa.registraionNO}</td>
              <td className="d-flex justify-content-center white">
                  <Button className="btn" onClick={(event) => handleEditClick(event , dataa)} name="button" variant="primary">
                      Edit
                  </Button>
                  <Button className="btn" onClick={()=>handleDeleteButton(dataa.id)} name="button" variant="danger">
                      Delete
                  </Button>

              </td>
            </tr>
      </>
    )
}

export default ReadOnlyRow;