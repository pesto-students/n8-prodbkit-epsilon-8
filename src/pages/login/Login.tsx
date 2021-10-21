import { Button, Divider, Form, Input, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser } from 'redux-features/auth';
import { hideDrawer, showDrawer } from 'redux-features/common';

import styles from './login.module.scss';

const Login: React.FC = () => {
  const [tokenId, setTokenID] = useState<string>('');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  // const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);

  const loginPostInfo = useMutation((token: any) =>
    axios.post(`http://65.2.82.9:3000/api/auth/login`, token),
  );

  const navigateToSignup = () => {
    dispatch(showDrawer({ key: 'signup' }));
  };

  const saveJWTinLocalStorage = (token: string) => {
    localStorage.setItem('jwt_token', token);
    // setCookie('jwt_token', 'bearer ' + token);
  };

  const responseGoogle = async (response: any) => {
    if (response && response.tokenId) {
      const { tokenId } = response;
      setTokenID(tokenId);

      try {
        await loginPostInfo.mutate(
          {
            id_token: tokenId,
          },
          {
            onSuccess: ({ data }) => {
              saveJWTinLocalStorage(data.access_token);
              dispatch(hideDrawer());
              dispatch(loginUser());
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      notification.error({
        message: 'Unable to log you in right now!',
      });
    }
  };

  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="email" label="Email id" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter your email id" size="large" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input placeholder="Enter your password" size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit" className={styles.formBtn}>
          Submit
        </Button>
      </Form.Item>
      <Divider plain>OR</Divider>
      <Form.Item>
        <GoogleLogin
          clientId="496210587745-q8pu8dgibkk4s69jg73191a6rbe7ejot.apps.googleusercontent.com"
          className={styles.googleLoginBtn}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </Form.Item>
      <Divider orientation="right" plain>
        {"Don't have an account?"}
        <Button type="link" onClick={navigateToSignup}>
          Signup
        </Button>
        here.
      </Divider>
    </Form>
  );
};

export default Login;
