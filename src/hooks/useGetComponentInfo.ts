import { useSelector } from 'react-redux';
import { StoreType } from '../store';
import { ComponentsStateType } from '../store/componentsReducer';

function useGetComponentInfo() {
  const components = useSelector<StoreType>((state) => state.component) as ComponentsStateType;

  const { componentList, selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((i) => i.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}

export default useGetComponentInfo;
