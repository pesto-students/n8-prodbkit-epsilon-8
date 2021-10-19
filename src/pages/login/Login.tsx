import { Button, Divider, Form, Input } from 'antd';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { showDrawer } from 'redux-features/common';

import styles from './login.module.scss';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const navigateToSignup = () => {
    dispatch(showDrawer({ key: 'signup' }));
  };

  const onManualLogin = (values: any) => {
    console.log(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onManualLogin}>
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
        <GoogleLogin clientId="" className={styles.googleLoginBtn} />
        {/* <Button type="primary" size="large" className={styles.formBtn}>
          Login via google
        </Button> */}
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
