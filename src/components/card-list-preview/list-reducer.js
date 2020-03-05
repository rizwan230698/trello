export const listReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_LISTS":
      return {
        ...state,
        lists: action.payload
      };
    case "ADD_NEW_LIST":
      return {
        ...state,
        lists: [...state.lists, action.payload]
      };
    case "DELETE_LIST":
      const filteredList = state.lists.filter(
        list => list._id !== action.payload
      );
      return {
        ...state,
        lists: filteredList
      };
    case "ADD_NEW_LIST_ITEM":
      const newState = { ...state };
      const { item, listId } = action.payload;
      const list = newState.lists.find(list => list._id === listId);
      list.items = [...list.items, item];
      return {
        ...newState
      };
    case "DELETE_LIST_ITEM":
      const updatedState = { ...state };
      const { parentId, itemDeleteId } = action.payload;
      const reqList = updatedState.lists.find(list => list._id === parentId);
      reqList.items = reqList.items.filter(item => item.id !== itemDeleteId);
      return {
        ...updatedState
      };

    case "DRAG_HAPPENED":
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        //draggableId,
        type
      } = action.payload;

      //Dragging list around
      if (type === "list") {
        const newState = { ...state };
        const list = newState.lists.splice(droppableIndexStart, 1);
        newState.lists.splice(droppableIndexEnd, 0, ...list);

        return newState;
      }

      //Dragged Item in same list
      if (droppableIdStart === droppableIdEnd) {
        const newState = { ...state };
        const draggedList = state.lists.find(
          list => list._id === droppableIdStart
        );
        const itemDragged = draggedList.items.splice(droppableIndexStart, 1);
        draggedList.items.splice(droppableIndexEnd, 0, ...itemDragged);

        return newState;
      }
      //Draging item to different list
      if (droppableIdStart !== droppableIdEnd) {
        const listDragStart = state.lists.find(
          list => list._id === droppableIdStart
        );
        const itemDragged = listDragStart.items.splice(droppableIndexStart, 1);
        const listDragEnd = state.lists.find(
          list => list._id === droppableIdEnd
        );
        listDragEnd.items.splice(droppableIndexEnd, 0, ...itemDragged);
      }
      return {
        ...state
      };
    default:
      return state;
  }
};
