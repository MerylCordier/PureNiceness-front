import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchData from '../../../services/api/call.api';
import Captcha from '../../../components/Common/Captcha/index '; 
import EmailValidation from './EmailValidation';

function Singup() {
 
  const [captchaData, setCaptchaData] = useState('');
  const { isCaptchaSuccessful, recaptchaValue } = captchaData;
  const [isModalActive, setIsModalActive] = useState(false);
  
  

  const [formUserData, setFormUserData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    lastname: '',
    firstname: '',
    zipcode: '',
    city: '',
    country: '',
  });

  const initialFormUserData = {
    email: '',
    password: '',
    passwordConfirm: '',
    lastname: '',
    firstname: '',
    zipcode: '',
    city: '',
    country: '',
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUserData({ ...formUserData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchData('POST', 'auth/signup', formUserData, false, recaptchaValue);
      if (response === null || response.error) {
        throw new Error('Une erreur s\'est produite !');
      }

      //ouverture de la modale pour validation du lien envoyé par mail
        // prévoir setTimeout pour changement modal en erreur

      //reception de la reponse du get /api/auth/signup/validate/uuid
      
        
       
      // Changement modal en succés quand retour valid et redirexion vers login
      //si reponse ok, redirection vers /signin
      toast.success('Inscription réussie !');
      setFormUserData({ ...initialFormUserData });

      setTimeout(() => {
        navigate('/signin');
      }, 5500);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDataCaptcha = (data) => {
    setCaptchaData(data);     
  };

  return (
    <>
      <h1 className="contact-h1">
        Inscription
      </h1>
      <form className="form__signup-container" onSubmit={handleSubmit}>

        <div className="form_div">
          <label className="form_label" htmlFor="email">
            <p className="label_name">Votre Email</p>
            <input className="contact_input" type="email" id="email" name="email" placeholder="Email" value={formUserData.email} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="lastname">
            <p className="label_name">Nom</p>
            <input className="contact_input" type="text" id="lastname" name="lastname" placeholder="Nom" value={formUserData.lastname} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="firstname">
            <p className="label_name">Prénom</p>
            <input className="contact_input" type="text" id="firstname" name="firstname" placeholder="Prénom" value={formUserData.firstname} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="zipcode">
            <p className="label_name">Code postal</p>
            <input className="contact_input" type="text" id="zipcode" name="zipcode" placeholder="code postal" value={formUserData.zipcode} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="city">
            <p className="label_name">Ville</p>
            <input className="contact_input" type="text" id="city" name="city" placeholder="Ville" value={formUserData.city} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="country">
            <p className="label_name">Pays</p>
            <input className="contact_input" type="text" id="country" name="country" placeholder="Pays" value={formUserData.country} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="password">
            <p className="label_name">Mot de passe</p>
            <input className="contact_input" type="password" id="password" name="password" placeholder="Mot de passe" value={formUserData.password} onChange={handleChange} />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="passwordConfirm">
            <p className="label_name">Confirmation</p>
            <input className="contact_input" type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirmation du mot de passe" value={formUserData.passwordConfirm} onChange={handleChange} />
          </label>
        </div>

        <Captcha onData={handleDataCaptcha}/>

        <button 
        className="button is-warning is-light" 
        type="submit" 
        disabled={!isCaptchaSuccessful}
        onClick={() => setIsModalActive(true)}>Envoyer
        </button>

        <div className={`modal ${isModalActive ? 'is-active' : ''}`}> 
          <div className="modal-background"></div>
            <div className="modal-content">
            veuillez cliquer sur le lien envoyé à l'adresse: {formUserData.email}  pour valider votre inscription.
            </div>        
            <button 
            className="modal-close is-large" 
            aria-label="close" 
            onClick={()=>setIsModalActive(false)}>              
            </button>
          </div>       

      </form>
      
     
    </>
  );
}

export default Singup;
