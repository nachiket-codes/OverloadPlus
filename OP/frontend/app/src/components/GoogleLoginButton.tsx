// Login.tsx or Register.tsx
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import API from '../api';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async (credentialResponse: any) => {
    const credential = credentialResponse.credential;
    const decoded: any = jwtDecode(credential);
    const email = decoded.email;
    const name = decoded.name;

    try {
      const response = await API.post('auth/google', {
        token: credential,
      });
      const jwt = response.data.access_token;
      // store JWT in localStorage or Redux
      localStorage.setItem('token', jwt);
      window.location.href = "/"
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleLoginButton;
