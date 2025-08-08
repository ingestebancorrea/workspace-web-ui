import { Grid } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { checkingCredentials, login } from "../../store/auth/authSilce";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleComponent = ({ url }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');

  const googleId = import.meta.env.VITE_GOOGLE_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    const provider = "googleTokenValidation";

    try{
      const { data } = await axios.post(
        url,
        {
          token: response.credential,
          loginprovider: provider,
          alias_role: role
        }
      );

      if ( data ) {
        dispatch(checkingCredentials());
        dispatch(login(data));
        navigate("/");
      }
    }catch(error){
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
  }

  const onFailure = () => {
    console.log("LOGIN FAILURE!");
  }

  return (
    <Grid container sx={{ pl: '4px' }} >
      <GoogleOAuthProvider clientId={googleId}>
        <GoogleLogin
          width="280px"
          onSuccess={onSuccess}
          onError={onFailure}
          theme='filled_blue'
          shape='rectangular'
          logo_alignment='left'
        />
      </GoogleOAuthProvider>
    </Grid>
  )
}