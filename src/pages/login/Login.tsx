import { Button, Divider, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser } from 'redux-features/auth';
import { hideDrawer } from 'redux-features/commonDrawer';
import { routes } from 'routes';

import styles from './login.module.scss';
import { submitGoogleLogin, submitManualLogin } from './services/login.service';

const Login: React.FC = () => {
  const [tokenId, setTokenID] = useState<string>('');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();

  const loginPostViaGoogle = useMutation((token: any) => submitGoogleLogin(token), {
    retry: false,
  });

  const loginPostViaEmailAndPassword = useMutation(
    (userValues: any) => submitManualLogin(userValues),
    { retry: false },
  );

  const saveJWTinLocalStorage = (token: string) => {
    localStorage.setItem('jwt_token', token);
  };

  const getClientID = (): string => {
    return process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  };

  const loginViaEmailAndPassword = async (userValues: { email: string; password: string }) => {
    try {
      await loginPostViaEmailAndPassword.mutate(userValues, {
        onSuccess: ({ data }: any) => {
          handleLoginSuccess(data);
        },
        onError: (e) => handleLoginFailure(e),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSuccess = (data: any) => {
    saveJWTinLocalStorage(data.access_token);
    dispatch(hideDrawer());
    dispatch(loginUser());
    location.href = routes.dashboard;
    // history.push(routes.dashboard);
  };

  const handleLoginFailure = (e?: any) => {
    console.log(e);
    notification.error({
      message: 'Unable to log you in right now!',
    });
  };

  const responseGoogle = async (response: any) => {
    if (response && response.tokenId) {
      const { tokenId } = response;
      setTokenID(tokenId);

      try {
        await loginPostViaGoogle.mutate(
          {
            id_token: tokenId,
          },
          {
            onSuccess: ({ data }) => {
              handleLoginSuccess(data);
            },
            onError: handleLoginFailure,
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
        <Input.Password placeholder="Enter your password" size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          onClick={() => loginViaEmailAndPassword(form.getFieldsValue())}
          className={styles.formBtn}
        >
          Submit
        </Button>
      </Form.Item>
      <Divider plain>OR</Divider>
      <Form.Item>
        <GoogleLogin
          clientId={getClientID()}
          className={styles.googleLoginBtn}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </Form.Item>
    </Form>
  );
};

export default Login;
