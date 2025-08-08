import { LoginSocialFacebook } from "reactjs-social-login";
import axios from 'axios';
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkingCredentials, login } from "../../store/auth/authSilce";
import { FacebookLoginButton } from "react-social-login-buttons";

export const FacebookComponent = ({ url }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);//Acceder a parámetros de la URL
  const role = params.get('role');

  const facebookId = import.meta.env.VITE_FACEBOOK_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const provider = "facebookTokenValidation";

    try {
      const { data } = await axios.post(
        url,
        {
          token: response.data.accessToken,
          loginprovider: provider,
          alias_role: role
        }
      );

      if ( data ) {
        dispatch(checkingCredentials());
        dispatch(login(data));
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        switch (status){
          case 404:
            return navigate("/auth/role"); 
          case 409:
            return navigate("/auth/login");
        }
      }
    }
  };

  const onFailure = (error) => {
    console.log("LOGIN FAILURE: ", error);
  }

  return (
    <Grid container>
      <LoginSocialFacebook
        appId={facebookId}
        onResolve={onSuccess}
        onReject={onFailure}
      >
        <FacebookLoginButton style={{ width: '280px' }} />
      </LoginSocialFacebook>
    </Grid>
  )
}

export default FacebookComponent