import { Button, Divider, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

import { showDrawer } from '../../redux-features/commonDrawer';
import styles from './signup.module.scss';

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    dispatch(showDrawer({ key: 'login' }));
  };

  return (
    <div className={styles.loginWrapper}>
      <Form layout="vertical">
        <Form.Item label="Email id">
          <Input placeholder="Enter your email id" size="large" />
        </Form.Item>
        <Form.Item label="Password">
          <Input placeholder="Enter your password" size="large" />
        </Form.Item>
        <Form.Item label="Confirm password">
          <Input placeholder="Re-enter your password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" className={styles.formBtn}>
            Signup
          </Button>
        </Form.Item>
        <Divider plain>OR</Divider>
        <Form.Item>
          <Button type="primary" size="large" className={styles.formBtn}>
            Signup via google
          </Button>
        </Form.Item>
        <Divider orientation="right" plain>
          Already have an account?
          <Button type="link" onClick={navigateToLogin}>
            Login
          </Button>
          here.
        </Divider>
      </Form>
    </div>
  );
};

export default Signup;
