import { FC, ReactNode } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface IDndDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  className?: string;
}

const DndDrop: FC<IDndDrop> = ({ children, className, ...props }) => {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${
            snapshot.isDraggingOver ? "bg-gray-50" : ""
          } ${className}`}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DndDrop;