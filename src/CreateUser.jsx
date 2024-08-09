import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'


const CreateUser = () => {

    const [user,setUser] = useState({
        image:"",
        name:"",
        email:"",
        age:"",
        position:""
    })

    
    
    const handleChange = (event) =>{
        
        const {name,value} = event.target
        setUser({...user,[name]: value})
    }
    
    const navigate = useNavigate()


    const handlesubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/create',user)
        .then(result => {console.log(result,"create resulttt")
          alert('Are you sure to want to add this user?')
          navigate( "/")
     }).catch(err => console.log(err,"createerr"))
        
    }

    

    

  return (
    <>
    <form onSubmit={handlesubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputimage" className="form-label">Image</label>
      <input onChange={handleChange} type="text" name='image' className="form-control" id="exampleInimage"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
      <input onChange={handleChange} type="text" name='name' className="form-control" id="exampleInname"/>
    </div>   
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
      <input onChange={handleChange} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">age</label>
      <input onChange={handleChange} type="number" name='age' className="form-control" id="exampleInputAge"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Position</label>
      <input onChange={handleChange} type="text" name='position' className="form-control" id="exampleInputPosition"/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary">Add</button>
  </form>
  </>
  )
}

export default CreateUser
