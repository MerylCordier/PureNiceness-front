import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import fetchData from '../../../../services/api/call.api';


function EmailValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const {uuid} =useParams();
      
    const fetchValidationUser = async () => { 
      try {
        const getValidateUser = await fetch(`http://localhost:4000/api/auth/signup/validate/${uuid}`, {
          method: 'GET',
        });
        if(getValidateUser.ok){
          navigate('/signin', { state: { fromValidation: true }, replace: true });
        }
      } catch (error) {
        return { error };
      }   
     
      
     
    } 
    useEffect(() => {
      fetchValidationUser();
      if (getValidateUser === null || getValidateUser.error) {
        throw new Error('Une erreur s\'est produite !');
      }
    }, []);
  
  
  return (
    <div>
      <h1>Validation de votre email</h1>
    </div>
  );
}

export default EmailValidation;
