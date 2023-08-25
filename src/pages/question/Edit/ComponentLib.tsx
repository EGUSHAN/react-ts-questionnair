import React from 'react';
import { Typography } from 'antd';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents';
import styles from './ComponentLib.module.scss';
import { addComponent } from '../../../store/componentsReducer';

const { Title } = Typography;

function genComponent(c: ComponentConfType) {
  const { type, title, Component, defaultProps } = c;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      }),
    );
  };

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}

function ComponentLib() {
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : 0 }}>
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ComponentLib;
