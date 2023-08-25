import React from 'react';
import { useDispatch } from 'react-redux';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents';
import { modifyComponent } from '../../../store/componentsReducer';

function NoProp() {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
}

function ComponentProp() {
  const { selectedComponent } = useGetComponentInfo();

  const dispatch = useDispatch();

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent === undefined) return;
    dispatch(
      modifyComponent({
        ...selectedComponent,
        props: newProps,
      }),
    );
  }

  if (selectedComponent === undefined) {
    return <NoProp />;
  }

  const { type, props: attr } = selectedComponent;
  const ComponentConf = getComponentConfByType(type);
  if (ComponentConf === null) return <NoProp />;
  return (
    (ComponentConf && <ComponentConf.PropComponent {...attr} onChange={changeProps} />) || null
  );
}

export default ComponentProp;
