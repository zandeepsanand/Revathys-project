import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./styledash.css";

const Studentdash = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    // Fetch projects from the backend when the component mounts
    axios.get('http://localhost:3000/project')
      .then(response => {
        console.log('Fetched data:', response.data);
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);




  const handleShow = (project) => {
    // Use the navigate function to navigate to the selected project page
    navigate(`/selected-project/${project.link}`);
  };




  return (
    <div className='container '>
      <h2>Projects</h2>

      <div className='d-flex justify-content-center'>
      <div className="card-container">
      {projects.map(project => (
        <div key={project._id} className="card">
          <img src={project.imgSrc} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <Button onClick={() => handleShow(project)}>View</Button>
        </div>
      ))}
    </div>
      </div>
     

      {/* Bootstrap Modal */}
 

      {/* React Router Link to navigate to another page */}
      <Link to="/enrolled-projects">
      <Button variant="primary" >My Project Page</Button>
    </Link>

      {/* Display user details and selected project details */}
      {userDetails && (
        <div>
          <h3>User Details</h3>
          <p>Email: {userDetails.email}</p>
          <p>Selected Project: {userDetails.selectedProject.title}</p>
        </div>
      )}
    </div>
  );
};

export default Studentdash;
