import React, {useState} from 'react';

import DefaultLogin from './DefaultLogin';
import PwdLogin from './PwdLogin';

function Login(): JSX.Element {
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');

  return loginType === 'quick' ? (
    <DefaultLogin setLoginType={setLoginType} />
  ) : (
    <PwdLogin setLoginType={setLoginType} />
  );
}

export default Login;
