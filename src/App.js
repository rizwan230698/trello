import React, { useState, useCallback } from "react";
import CardListPreview from "./components/card-list-preview/CardListPreview";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import "./components/menu/Menu.css";
function App() {
  const [isDragged, setIsDragged] = useState(false);
  const [dragData, setDragData] = useState(null);
  const [color, setColor] = useState("color-1");

  const onDragEnd = props => {
    let { destination, source, draggableId, type } = props;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    setDragData({ destination, source, draggableId, type });
    setIsDragged(true);
  };
  const resetDragData = useCallback(() => {
    setIsDragged(false);
    setDragData(null);
  }, []);

  const changeColor = color => {
    console.log(color);
    setColor(color);
  };
  const { source, destination, draggableId, type } = dragData || {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board" id={`${color}`}>
        <Header />
        <Menu changeColor={changeColor} color={color} />
        <CardListPreview
          isDragged={isDragged}
          resetDragData={resetDragData}
          droppableIdStart={dragData && source.droppableId}
          droppableIdEnd={dragData && destination.droppableId}
          droppableIndexEnd={dragData && destination.index}
          droppableIndexStart={dragData && source.index}
          draggableId={dragData && draggableId}
          type={dragData && type}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
