import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../../services/api/call.api";
import Captcha from "../../../components/Common/Captcha/index ";

function Signup() {
  const [captchaData, setCaptchaData] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { isCaptchaSuccessful, recaptchaValue } = captchaData;
  const [isToggled, setIsToggled] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const [formUserData, setFormUserData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    lastname: "",
    firstname: "",
    zipcode: "",
    city: "",
    country: "",
  });

  const initialFormUserData = {
    email: "",
    password: "",
    passwordConfirm: "",
    lastname: "",
    firstname: "",
    zipcode: "",
    city: "",
    country: "",
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUserData({ ...formUserData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchData(
        "POST",
        "auth/signup",
        formUserData,
        false,
        recaptchaValue
      );

      if (response === null || response.error) {
        throw new Error("Une erreur s'est produite !");
      }

      setUserEmail(response);

      //ouverture de la modale pour validation du lien envoyé par mail
      // prévoir setTimeout pour changement modal en erreur
      //reception de la reponse du get /api/auth/signup/validate/uuid
      // quand retour valide fermeture de la fenêtre
      //si reponse ok, redirection vers /signin
      setIsModalActive(true);

      setTimeout(() => {
        navigate("/signup");
      }, 480000);

      setFormUserData({ ...initialFormUserData });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDataCaptcha = (data) => {
    setCaptchaData(data);
  };

  const handleToggle = (event) => {
    event.preventDefault();
    setIsToggled(!isToggled);
  };

  return (
    <>
      <h1 className="contact-h1">Inscription</h1>
      <form className="form__signup-container" onSubmit={handleSubmit}>
        <div className="form_div">
          <label className="form_label" htmlFor="email">
            <p className="label_name">Votre Email</p>
            <input
              className="contact_input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formUserData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="lastname">
            <p className="label_name">Nom</p>
            <input
              className="contact_input"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nom"
              value={formUserData.lastname}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="firstname">
            <p className="label_name">Prénom</p>
            <input
              className="contact_input"
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              value={formUserData.firstname}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="zipcode">
            <p className="label_name">Code postal</p>
            <input
              className="contact_input"
              type="text"
              id="zipcode"
              name="zipcode"
              placeholder="code postal"
              value={formUserData.zipcode}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="city">
            <p className="label_name">Ville</p>
            <input
              className="contact_input"
              type="text"
              id="city"
              name="city"
              placeholder="Ville"
              value={formUserData.city}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="country">
            <p className="label_name">Pays</p>
            <input
              className="contact_input"
              type="text"
              id="country"
              name="country"
              placeholder="Pays"
              value={formUserData.country}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="password">
            <p className="label_name">Mot de passe</p>
            <input
              className="contact_input"
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={formUserData.password}
              onChange={handleChange}
            />
          </label>

          <div className="checkboxes">
            <label className="checkbox-password">
              <input
                type="checkbox"
                checked={formUserData.password.match(/[A-Z]/) ? true : false}
              />
              <p> Une Majuscule </p>
            </label>

            <label className="checkbox-password">
              <input
                type="checkbox"
                checked={formUserData.password.match(/[0-9]/) ? true : false}
              />
              <p> Un chiffre </p>
            </label>

            <label className="checkbox-password">
              <input
                type="checkbox"
                checked={formUserData.password.length >= 12 ? true : false}
              />
              <p>12 caractères</p>
            </label>
          </div>
        </div>

        <div className="form_div">
          <label className="form_label" htmlFor="passwordConfirm">
            <p className="label_name">Confirmation</p>
            <input
              className="contact_input"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirmation du mot de passe"
              value={formUserData.passwordConfirm}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form_label-submit_confirm" htmlFor="submitConfirm">
          <div className="terms_div">
            <button className="button_toggle" onClick={handleToggle}>
              {isToggled ? (
                <FontAwesomeIcon icon={faToggleOn} />
              ) : (
                <FontAwesomeIcon icon={faToggleOff} />
              )}
              <p className="button_toggle-text">
                J'ai lu et j'accepte les conditions d'utilisation et la
                politique de confidentialité du site
              </p>
            </button>
          </div>

          <Captcha onData={handleDataCaptcha} />

          <button
            className="button is-warning is-light"
            type="submit"
            disabled={!isToggled || !isCaptchaSuccessful}
          >
            Envoyer
          </button>
        </div>
      </form>
      {isModalActive && (
        <div className="mailing_modal">
          <div className="mailing_modal-content">
            Inscription réussie! Un lien de validation vous a été envoyé à
            l'adresse:
            <br />
            <p className="email-validation">{userEmail}</p>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsModalActive(false)}
          ></button>
        </div>
      )}
    </>
  );
}

export default Signup;
