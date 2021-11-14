import './login-page.scss';

import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Button, Card, Text } from '@blueprintjs/core';
import { useLoginWithGoogleMutation } from '../../../generated/graphql';

export const LoginPage = () => {
  const [loginWithGoogle] = useLoginWithGoogleMutation({
    onCompleted: (data) => {
      console.log('on login success', data);
    },
    onError: (e) => {
      console.log('on google login error');
    },
  });

  const onLoginSuccess = (data: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (data.code) {
      loginWithGoogle({ variables: { data: { code: data.code } } });
    }
  };

  const onLoginFailure = (e: any) => {
    console.log('login failed', e);
  };

  return (
    <div className={'login-page'}>
      <Card>
        <div className={'login-card'}>
          <div className={'login-heading'}>Login</div>

          <GoogleLogin
            responseType='code'
            clientId={''}
            buttonText='Log in with Google'
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </Card>
    </div>
  );
};
