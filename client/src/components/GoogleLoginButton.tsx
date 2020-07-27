import React, { useState, useEffect, useContext } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { logedInContext } from '../LogedInContext';



// const GoogleLoginButton = (props:{setislogedIn:React.Dispatch<React.SetStateAction<boolean>>}) => {
const GoogleLoginButton = () => {
  const [CLIENT_ID, SET_CLIENT_ID] = useState('');
  const [token, setToken] = useState(null);
  const { islogedIn, setislogedIn } = useContext(logedInContext);
  //const [islogedIn, setislogedIn] = logedIn; 

  const getClientId = () => {
    fetch('/api/google_id')
      .then(res => res.json())
      .then(id => SET_CLIENT_ID(id));
  }

  useEffect(() => {
    getClientId();
  }, [])

  useEffect(() => {
    if (!token) return;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token })
    };
    fetch('/api/google_id/verify', options)
      .then(res => res.json())
      .then(msg => console.log(msg))
  }, [token]);

  const login = (response: any) => {
    if (response.tokenId) {
      setislogedIn(true);
      setToken(response.tokenId);
    }
  }

  const logout = (response: any) => {
    setislogedIn(false);
    setToken(null);
    fetch('/api/clear_cookie')
    .then(res => res.json())
    .then(message => console.log(message))
    .catch(err => console.error(err));
  }

  const handleLoginFailure = (response: any) => {
    alert('Failed to log in')
  }

  const handleLogoutFailure = (response: any) => {
    alert('Failed to log out')
  }
  
  return (
    <div>
      {CLIENT_ID !== '' ?
        islogedIn?
          // @ts-ignore:
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
           
            uxMode='popup'
            clientId={CLIENT_ID}
            buttonText='Login'
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
          : ''}
        {/* {token ? <h5>Your Access Token: <br /><br /> {token}</h5> : null} */}
    </div>
  );
}
export default GoogleLoginButton;