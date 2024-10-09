import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef } from "react";

function Captcha({ onData }) {
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);
  const recaptcha = useRef();

  function onChange() {
    const recaptchaValue = recaptcha.current.getValue();
    if (!recaptchaValue) {
      toast.error("Veuillez valider le captcha");
    }
    onData({ isCaptchaSuccessful, recaptchaValue });
  }

  useEffect(() => {
    setIsCaptchaSuccess(true);
  }, [recaptcha]);

  return (
    <ReCAPTCHA
      ref={recaptcha}
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      size="compact"
      theme="dark"
      onChange={onChange}
    />
  );
}

export default Captcha;
