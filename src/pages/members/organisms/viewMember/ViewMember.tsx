import { Col, Row, Space } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from '../../../../shared/components/atoms/loader/Loader';
import { IGlobalState } from '../../../../shared/interfaces/globalState';
import { IMemberData, IMemberInfo } from '../../member.interface';
import { getMember } from '../../services/members.service';
import styles from './viewMember.module.scss';

const ViewMember: React.FC = () => {
  const commonStoreData = useSelector((state: IGlobalState) => state.common);
  const [memberInfo, setMemberInfo] = useState<IMemberData>({} as IMemberData);

  useEffect(() => {
    const id = commonStoreData.id as string;
    getMember(id).then((res: IMemberInfo) => {
      setMemberInfo({ ...res.data });
    });
  }, []);

  if (isEmpty(memberInfo)) {
    return <Loader />;
  }

  return (
    <Space className={styles.viewWrapper} direction="vertical" size={16}>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Name:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.name}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Role:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.role}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Email id:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.email}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Username:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.username}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Created at:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.createdAt}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Updated at:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.updatedAt}</div>
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={8}>
          <div className={styles.label}>Deleted at:</div>
        </Col>
        <Col className="gutter-row" span={16}>
          <div className={styles.values}>{memberInfo.deletedAt || 'N/A'}</div>
        </Col>
      </Row>
    </Space>
  );
};

export default ViewMember;
