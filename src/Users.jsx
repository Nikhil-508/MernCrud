import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API when the component mounts
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const navigate = useNavigate()

  const handleDelete = (userid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:3000/users/${userid}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== userid));
        navigate('/'); 
        alert('User deleted successfully');
        })
        .catch(err => console.error('Error deleting user:', err.response ? err.response.data : err.message));
    }
  };

  return (
    <>
      <Link to="/create">
        <Button style={{ backgroundColor: "green", margin: "4px" }}>Add User</Button>
      </Link>
      {users.length > 0 ? (
        <Row>
          {users.map(user => (
            <Col key={user.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={user.image || 'holder.js/100px180'} alt={user.name} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    Email: {user.email}<br />
                    Age: {user.age}<br />
                    Position: {user.position}
                  </Card.Text>
                  <Link to={`/update/${user._id}`}>
                    <Button style={{ margin: "5px" }} variant="primary">Update</Button>
                  </Link>
                  
                    <Button onClick={() => handleDelete(user._id)} style={{ backgroundColor: 'red' }} variant="primary">Delete</Button>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
};

export default Users;
