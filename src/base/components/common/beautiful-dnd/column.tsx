import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { IDndColumn, IDndBox } from "./BeautifulDnd.tpes";
import DndDrop from "./drop";
import DndDrag from "./drag";


interface IDndColumnProps {
  className?: string;
  column: IDndColumn;
  boxes: IDndBox[];
  provided?: DraggableProvided;
}

const DndColumn: FC<IDndColumnProps> = ({ column, boxes, provided }) => {
  return (
    <div className={column.colClassname}>
      <h3 {...provided?.dragHandleProps} className="text-base font-medium text-gray-800">{column.title}</h3>
      <DndDrop droppableId={column.id} type="BOX" className="pb-1">
        {boxes.map((box, index) => (
          <DndDrag draggableId={box.id} index={index} key={box.id} className={column.boxClassName}>
            <div>{box.id}</div>
          </DndDrag>
        ))}
      </DndDrop>
    </div>
  );
};

export default DndColumn;
