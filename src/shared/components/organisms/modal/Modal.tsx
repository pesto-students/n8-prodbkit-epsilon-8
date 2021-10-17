import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from 'redux-features/common';
import { IGlobalState } from 'shared/interfaces/globalState';

import styles from './modal.module.scss';

const AntDModal: React.FC = () => {
  const dispatch = useDispatch();
  const commonData = useSelector((state: IGlobalState) => state.common);

  const handleCancel = () => {
    dispatch(hideModal());
  };

  const onOk = () => {
    console.log('ok');
  };

  return (
    <Modal
      title={commonData.modalTitle}
      visible={commonData.isModalVisible}
      onOk={onOk}
      onCancel={handleCancel}
      okButtonProps={{ className: `${styles.okBtn}` }}
    >
      <p>{commonData.modalText}</p>
    </Modal>
  );
};

export default AntDModal;
