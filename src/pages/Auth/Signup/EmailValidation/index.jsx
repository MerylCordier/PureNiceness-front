import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EmailValidation() {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const fetchValidationUser = async () => {
    try {
      const getValidateUser = await fetch(
        `http://localhost:4000/api/auth/signup/validate/${uuid}`,
        {
          method: "GET",
        }
      );

      if (getValidateUser === null || getValidateUser.error) {
        throw new Error(
          "La Validation de votre email a échouée, veuillez rééssayer"
        );
      }
      if (getValidateUser.ok) {
        const userData = await getValidateUser.json();

        navigate("/signin", {
          state: { fromValidation: true, email: userData.email },
          replace: true,
        });
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchValidationUser();
  }, []);
}

export default EmailValidation;
