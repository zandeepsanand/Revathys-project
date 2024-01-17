
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from './AppContext';

const ProjectDetailPage = ({ match, projects }) => {
    const { enrolled, setEnrolled,userId, setUserId } = useContext(AppContext);
    const { projectId } = useParams();
    console.log(projectId , "project id");
    console.log(userId,"user id from db");

  const project = projects.find((p) => p.link === projectId);
  console.log(project._id , "deail");

  const handleSelect = async (selectedProject) => {
    try {
      
      const response = await axios.post('http://localhost:3000/enroll', {
        userId: userId,
        projectId: selectedProject._id,
      });
      console.log(response.data , "response from db");

    } catch (error) {
      console.error('Error selecting project:', error);
    }
  };

  if (!project) {
    return <div>Project not found</div>;
  }



  return (
    <div className='container d-flex justify-content-center mt-5'>
    <div key={project._id} className="card">
            <img src={project.imgSrc} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
           <Button onClick={() => handleSelect(project)}>Select</Button>
           
          </div>
    </div>
    
  );
};

export default ProjectDetailPage;