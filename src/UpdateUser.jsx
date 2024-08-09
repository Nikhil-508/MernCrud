import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { userId } = useParams();
  console.log(userId,"iddd");
  
  const [user, setUser] = useState({
    image: '',
    name: '',
    email: '',
    age: '',
    position: ''
  });
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log("Error fetching user:", err));
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/${userId}`, user)
      .then(res => {
        console.log('User updated successfully:', res.data);
        alert("updated successfully")
        navigate('/'); // Navigate to the homepage or another page after successful update
      })
      .catch(err => console.log('Error updating user:', err));
  };



  return (
    <>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              onChange={handleChange}
              value={user.image}
              type="text"
              name="image"
              className="form-control"
              id="exampleInimage"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              onChange={handleChange}
              value={user.name}
              type="text"
              name="name"
              className="form-control"
              id="exampleInname"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              onChange={handleChange}
              value={user.email}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              onChange={handleChange}
              value={user.age}
              type="number"
              name="age"
              className="form-control"
              id="exampleInputAge"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              onChange={handleChange}
              value={user.position}
              type="text"
              name="position"
              className="form-control"
              id="exampleInputPosition"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              disabled // Assuming checkbox is not used for updates
            />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default UpdateUser;
