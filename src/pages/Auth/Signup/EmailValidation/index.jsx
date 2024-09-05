import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import fetchData from '../../../../services/api/call.api';


function EmailValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const {uuid} =useParams();
  

    
    const fetchValidationUser = async () => {
    
      const getValidateUser = await fetch(`http://localhost:4000/api/auth/signup/validate/${uuid}`, {
        method: 'GET',
      });
      if(getValidateUser.ok){
        navigate('/signin', { state: { from: location }, replace: true });
      }
      
    } 
    useEffect(() => {
      fetchValidationUser();
    }, []);
  
  
  return (
    <div>
      <h1>OK</h1>
      
    </div>
  );
}

export default EmailValidation;
