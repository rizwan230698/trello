import React, { useState, useCallback } from "react";
import CardListPreview from "./components/card-list-preview/CardListPreview";
import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const [isDragged, setIsDragged] = useState(false);
  const [dragData, setDragData] = useState(null);

  const onDragEnd = props => {
    let { destination, source, draggableId } = props;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    setDragData({ destination, source, draggableId });
    setIsDragged(true);
  };
  const resetDragData = useCallback(() => {
    setIsDragged(false);
    setDragData(null);
  }, []);

  const { source, destination, draggableId } = dragData || {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <CardListPreview
          isDragged={isDragged}
          resetDragData={resetDragData}
          droppableIdStart={dragData && source.droppableId}
          droppableIdEnd={dragData && destination.droppableId}
          droppableIndexEnd={dragData && destination.index}
          droppableIndexStart={dragData && source.index}
          draggableId={dragData && draggableId}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
