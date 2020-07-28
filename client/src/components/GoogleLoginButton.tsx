import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { LogedInContext } from './LogedInProvider';

function GoogleLoginButton() {
  const [CLIENT_ID, SET_CLIENT_ID] = useState('');
  const [token, setToken] = useState(null);
  const { isLogedIn, updateLogedIn } = useContext(LogedInContext);

  const getClientId = () => {
    fetch('/api/google_id')
      .then((res) => res.json())
      .then((id) => SET_CLIENT_ID(id));
  };

  useEffect(() => {
    getClientId();
  }, []);

  useEffect(() => {
    if (!token) return;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
    fetch('/api/google_id/verify', options)
      .then((res) => res.json())
      .then((msg) => console.log(msg));
  }, [token]);

  const login = (response: any) => {
    if (response.tokenId) {
      updateLogedIn(true);
      setToken(response.tokenId);
    }
  };

  const logout = (_response: any) => {
    updateLogedIn(false);
    setToken(null);
    fetch('/api/clear_cookie')
      .then((res) => res.json())
      .then((message) => console.log(message))
      .catch((err) => console.error(err));
  };

  const handleLoginFailure = (_response: any) => {
    alert('Failed to log in');
  };

  const handleLogoutFailure = (_response: any) => {
    alert('Failed to log out');
  };

  return (
    <div>
      {CLIENT_ID !== '' // eslint-disable-line
        ? isLogedIn
          ? (
          // @ts-ignore:
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            />
          ) : (
            <GoogleLogin

              uxMode="popup"
              clientId={CLIENT_ID}
              buttonText="Login"
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy="single_host_origin"
              responseType="code,token"
            />
          )
        : ''}
    </div>
  );
}
export default GoogleLoginButton;
