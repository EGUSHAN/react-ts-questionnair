import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '@/store/componentsReducer';
import useGetComponentInfo from './useGetComponentInfo';

function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem === document.body) return true;

  return !!activeElem?.matches('div[role="button"]');
}

function useBindCanvasBeyPress() {
  const dispatch = useDispatch();

  const { selectedId } = useGetComponentInfo();
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent({ fe_id: selectedId }));
  });

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });

  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(ActionCreators.undo());
    },
    {
      exactMatch: true,
    },
  );
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(ActionCreators.redo());
    },
    {
      exactMatch: true,
    },
  );
}

export default useBindCanvasBeyPress;
