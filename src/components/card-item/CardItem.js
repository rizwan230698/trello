import React from "react";
import "./CardItem.css";

import { Draggable } from "react-beautiful-dnd";

function CardItem({ listId, item: { id, title }, deleteItem, index }) {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div
          className="card-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>
            {title}
            <i
              title="delete item"
              onClick={() => deleteItem(listId, id)}
              className="fa fa-trash delete-item-icon"
            ></i>
          </p>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
