import React, { FC, ReactNode } from "react";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

interface IDndDragProps extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

const DndDrag: FC<IDndDragProps> = ({ className, children, dragAll, ...props }) => {
  if (!React.isValidElement(children)) return <div />;
  return (
    <Draggable {...props}>
      {(provided) => {
        const dragHandleProps = dragAll ? provided.dragHandleProps : {};
        return (
          <div
            className={className}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...dragHandleProps}
          >
            {React.cloneElement(children, {
              // @ts-ignore
              provided,
              ...(dragAll ? { ...provided.dragHandleProps } : {})
            })}
          </div>
        );
      }}
    </Draggable>
  );
};

DndDrag.defaultProps = {
  dragAll: true,
};

export default DndDrag;
