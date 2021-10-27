import { Form, Input, notification, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { hideDrawer } from 'redux-features/commonDrawer';

import AntDButton from '../../../../shared/components/atoms/button/Button';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import { fetchMemberList, handleMemberSubmit } from '../../services/members.service';
import { formatFormData } from './memberForm.helper';
import styles from './memberForm.module.scss';
const { Option } = Select;

const MemberForm: React.FC = () => {
  const [form] = Form.useForm();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const dispatch = useDispatch();

  const { urlId } = commonStoreData;
  const memberSubmit = useMutation(
    (formData: any) => handleMemberSubmit({ data: formData, id: urlId }),
    { retry: false },
  );
  const memberAPIResponse = useQuery(`member${urlId}`, () => fetchMemberList(urlId), {
    retry: false,
  });

  const { data } = memberAPIResponse;
  const selectedMemberId = commonStoreData.id;

  useEffect(() => {
    form.setFieldsValue({
      name: '',
      email: '',
      role: null,
    });
    if (!!selectedMemberId) {
      if (data) {
        const memberData = data.data as any;
        const dataById = memberData.filter((item: any) => item.team_id === selectedMemberId);
        if (dataById.length) {
          const dataAtIndex0 = dataById[0];
          form.setFieldsValue({
            name: dataAtIndex0.name,
            email: dataAtIndex0.email,
            role: dataAtIndex0.role,
          });
        }
      }
    }
  }, []);

  const successCallback = (action: 'created' | 'updated' | 'deleted') => {
    dispatch(hideDrawer());
    notification.success({
      message: `Member ${action} successfully`,
    });
  };

  const handleFailedToSave = () => {
    notification.error({
      message: 'Something went wrong. Please try again',
    });
  };

  const handleFormSave = () => {
    if (!!selectedMemberId) {
      // handleUpdateMember();
    } else {
      handleCreateMember();
    }
  };

  const handleCreateMember = () => {
    const formattedData = formatFormData(form.getFieldsValue()) as any;
    memberSubmit.mutate(formattedData, {
      onSuccess: () => successCallback('created'),
      onError: handleFailedToSave,
    });
  };

  // const handleUpdateMember = () => {
  //   const formattedData = formatFormData(form.getFieldsValue());
  // };

  const handleFormCancel = () => {
    dispatch(hideDrawer());
  };

  const handleFormChanges = (changedFields: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...changedFields,
    });
  };

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

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select placeholder="Select a role" allowClear>
          <Option value="ADMIN">Admin</Option>
          <Option value="TL">Team Lead</Option>
          <Option value="DEV">Developer</Option>
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
