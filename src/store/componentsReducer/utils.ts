import { ComponentInfoType, ComponentsStateType } from './index';

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter((i) => !i.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);

  let newSelectedId = '';
  const { length } = visibleComponentList;

  if (length <= 1) {
    newSelectedId = '';
  } else if (index + 1 === length) {
    newSelectedId = visibleComponentList[index - 1].fe_id;
  } else {
    newSelectedId = visibleComponentList[index + 1].fe_id;
  }
  return newSelectedId;
}

export function insertNewComponent(state: ComponentsStateType, newComponent: ComponentInfoType) {
  let components = [...state.componentList];
  if (state.selectedId) {
    const index = state.componentList.findIndex((i) => i.fe_id === state.selectedId);
    if (index !== -1) {
      components.splice(index + 1, 0, newComponent);
    } else {
      components = [...components, newComponent];
    }
  } else {
    components = [...components, newComponent];
  }
  return {
    ...state,
    selectedId: newComponent.fe_id,
    componentList: [...components],
  };
}

export default {
  getNextSelectedId,
  insertNewComponent,
};
