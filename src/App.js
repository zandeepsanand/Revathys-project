
//import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter as Router

import Main from './ui-component/Main';
import Work from './ui-component/Work';
import Home from './ui-component/Home';
import Signup from './ui-component/Signup';
import Login from './ui-component/Login';
import Studentdash from './ui-component/Studentdash';
import Webdevelopment from './ui-component/Webdevelopment';
import DataScience from './ui-component/Datascience';
import Appdevelopment from './ui-component/Appdevelopment';
import Ecommerce from './ui-component/Ecommerce';
import Machinelearning from './ui-component/Machinelearning';
import MobileApp from './ui-component/MobileApp';
import { AppProvider } from './ui-component/AppContext';
import SelectedProjectPage from './ui-component/SelectedProjectPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectDetailPage from './ui-component/ProjectDetailPage';
import EnrolledProjects from './ui-component/EnrolledProjects';
function App() {

  const [projects, setProjects] = useState([]);

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
  return (
    <div>
      <AppProvider>
      <Router>
    
      <Home />
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='Work' element={<Work />} />
        <Route path='Home' element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='/studentdash' element={<Studentdash />} />
       
        <Route path='/selected-project/:projectId' element={<ProjectDetailPage projects={projects} />} />
        <Route path='Webdevelopment' element={<Webdevelopment />} />
        <Route path='Datascience' element={<DataScience />} />
        <Route path='Appdevelopment' element={<Appdevelopment />} />
        <Route path='Ecommerce' element={<Ecommerce />} />
        <Route path='Machinelearning' element={<Machinelearning />} />
        <Route path='MobileApp' element={<MobileApp />} />
        <Route path="/selected-project" element={<SelectedProjectPage />} />
        <Route path="enrolled-projects" element={<EnrolledProjects />} />
      </Routes>
    </Router>
      </AppProvider>
      
    </div>
  );
}

export default App;
