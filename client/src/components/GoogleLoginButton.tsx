import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton, Avatar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LogedInContext } from './LogedInProvider';

const useStyles = makeStyles((theme: Theme) => createStyles({
  picture: {
    width: '2rem',
    height: 'auto',
  },
  iconBtn: {
    padding: 6,
  },
}));

function GoogleLoginButton() {
  const [CLIENT_ID, SET_CLIENT_ID] = useState('');
  const [token, setToken] = useState(null);
  const { isLogedIn, updateLogedIn } = useContext(LogedInContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [userPicture, setUserPicture] = useState('');

  const classes = useStyles();

  const getClientId = () => {
    fetch('/api/google_id')
      .then((res) => res.json())
      .then((id) => SET_CLIENT_ID(id));
  };

  useEffect(() => {
    getClientId();
  }, []);

  useEffect(() => {
    const something = async () => {
      if (isLogedIn) {
        getUserPicture();
      }
      if (!token) return;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ token }),
      };
      await fetch('/api/google_id/verify', options)
        .then((res) => res.json())
        .then((msg) => console.log(msg));
      console.log('IS LOGED IN:', isLogedIn)
    };
    something();
  }, [token, isLogedIn]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
      });
    };
  });

  // useEffect(() => {
  // console.log('!!!!',isLogedIn);
  // if (isLogedIn) {
  //  getUserPicture();
  // }
  // }, [isLogedIn])

  const getUserPicture = () => {
    fetch('/api/users/picture')
      .then((res) => res.json())
      .then((pic) => setUserPicture(pic));
  };

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

  const renderBtn = (): JSX.Element => {
    if (isLogedIn) {
      return (
        // @ts-ignore:
        <GoogleLogout
          clientId={CLIENT_ID}
          render={(renderProps) => (
            <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.iconBtn}>
              <Avatar src={userPicture} className={classes.picture} onClick={logout} />
            </IconButton>
          )}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        />
      );
    }
    if (width < 600) {
      return (
        <GoogleLogin
          uxMode="popup"
          clientId={CLIENT_ID}
          render={(renderProps) => (
            <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.iconBtn}>
              <AccountCircleIcon className={classes.picture} />
            </IconButton>
          )}
          buttonText="Login"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
          responseType="code,token"
        />
      );
    }
    return (
      <GoogleLogin
        uxMode="popup"
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={handleLoginFailure}
        cookiePolicy="single_host_origin"
        responseType="code,token"
      />
    );
  };
  
  return (
    <div id="LoginBtn">
      {CLIENT_ID !== '' ? renderBtn() : ''}
    </div>
  );
}
export default GoogleLoginButton;
