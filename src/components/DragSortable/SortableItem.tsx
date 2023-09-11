import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PropsType = {
  id: string;
  children: React.JSX.Element;
};

function SortableItem(props: PropsType) {
  const { id, children } = props;

  const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default SortableItem;
