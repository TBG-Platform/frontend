import './login-page.scss';

import React from 'react';
import { Button, Card, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';

@observer
export class LoginPage extends React.Component {
  public render() {
    return (
      <div className={'login-page'}>
        <Card>
          <div className={'login-card'}>
            <div className={'login-heading'}>Login</div>

            <Button minimal outlined text={'Log in with Google'} />
          </div>
        </Card>
      </div>
    );
  }
}
