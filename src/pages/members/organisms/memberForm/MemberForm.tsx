import { Form, Input, notification, Select, Space } from 'antd';
import { updateMemberList } from 'pages/members/redux/members';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux-features/common';

import AntDButton from '../../../../shared/components/atoms/button/Button';
import Loader from '../../../../shared/components/atoms/loader/Loader';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import { IMemberInfo, IMemberPostData } from '../../member.interface';
import { createMember, getMember, updateMember } from '../../services/members.service';
import { formatFormPostData, formatFormPutData } from './memberForm.helper';
import styles from './memberForm.module.scss';
const { Option } = Select;

const MemberForm: React.FC = () => {
  const [form] = Form.useForm();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const isEditForm = commonStoreData.id;
  const selectedMemberId = commonStoreData.id;

  useEffect(() => {
    form.setFieldsValue({
      email: '',
      role: null,
    });
    if (selectedMemberId && isEditForm) {
      setLoading(true);
      getMember(selectedMemberId).then((res: IMemberInfo) => {
        const { data } = res;
        setLoading(false);
        form.setFieldsValue({
          name: data.name,
          username: data.username,
          email: data.email,
          role: data.role,
        });
      });
    }
  }, []);

  const successCallback = (action: 'created' | 'updated' | 'deleted') => {
    dispatch(hideDrawer());
    notification.success({
      message: `Member ${action} successfully`,
    });
  };

  const failureCallback = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const handleFormSave = () => {
    if (isEditForm && selectedMemberId) {
      handleUpdateMember();
    } else {
      handleCreateMember();
    }
  };

  const handleCreateMember = () => {
    const formattedData = formatFormPostData(form.getFieldsValue()) as any;
    createMember(formattedData).then((res: any) => {
      if (res.status === 200) {
        dispatch(updateMemberList(res.data));
        successCallback('created');
      } else {
        failureCallback();
      }
    });
  };

  const handleUpdateMember = () => {
    const formattedData = formatFormPutData(form.getFieldsValue());
    updateMember(selectedMemberId as string, formattedData).then((res: any) => {
      if (res.status === 200) {
        dispatch(updateMemberList(res.data));
        successCallback('updated');
      } else {
        failureCallback();
      }
    });
  };

  const handleFormCancel = () => {
    dispatch(hideDrawer());
  };

  const handleFormChanges = (changedFields: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...changedFields,
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSave}
      onFieldsChange={handleFormChanges}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter member's name" size="large" />
      </Form.Item>

      <Form.Item name="email" label="Email id" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter your email id" size="large" />
      </Form.Item>

      <Form.Item name="username" label="Username" rules={[{ required: true, type: 'string' }]}>
        <Input placeholder="Enter username" size="large" />
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select placeholder="Select a role" allowClear>
          <Option value="admin">Admin</Option>
          <Option value="manager">Manager</Option>
          <Option value="other">Others</Option>
        </Select>
      </Form.Item>
      <div className={styles.formFooterButtons}>
        <Space direction="horizontal" size={16}>
          <Form.Item>
            <AntDButton type="link" onClick={handleFormCancel} text="Cancel" />
          </Form.Item>
          <Form.Item>
            <AntDButton type="primary" htmlType="submit" text="Save" />
          </Form.Item>
        </Space>
      </div>
    </Form>
  );
};

export default MemberForm;
