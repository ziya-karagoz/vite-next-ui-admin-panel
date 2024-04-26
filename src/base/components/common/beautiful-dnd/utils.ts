// @ts-nocheck
export const clone = (data: any) => {
    return JSON.parse(JSON.stringify(data));
  };
  /**
   * 是否拖拽到了其他面板
   * @param {起点} source
   * @param {终点} destination
   */
  export const onBoxChange = (source, destination) => {
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return true;
    }
    return false;
  };
  /**
   *
   */
  export const deleteBox = (data, { droppableId, index }) => {
    data = clone(data);
    data.columns[droppableId].boxIds.splice(index, 1);
    return data;
  };
  /**
   *
   */
  export const addBox = (data, { droppableId, index }, boxId) => {
    data = clone(data);
    data.columns[droppableId].boxIds.splice(index, 0, boxId);
    return data;
  };
  