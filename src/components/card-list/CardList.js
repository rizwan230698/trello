import React, { useState, useRef } from "react";
import "./CardList.css";
import CardItem from "../card-item/CardItem";
import Form from "../form/Form";
import Card from "../card/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function CardItemList({
  list,
  deleteList,
  createItem,
  deleteItem,
  index
}) {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const newItemFormRef = useRef();

  const createNewItem = async event => {
    event.preventDefault();
    if (inputValue) {
      const newItem = {
        title: inputValue
      };
      const id = list._id;

      await createItem(id, newItem);
      setInputValue("");
      newItemFormRef.current.focus();
    }
  };

  const deleteItm = (listId, itemId) => {
    deleteItem(listId, itemId);
  };

  const deleteLst = () => {
    deleteList(list._id);
  };

  const handlechange = event => {
    setInputValue(event.target.value);
  };
  const handleFormOnKeyDown = event => {
    if (event.key === "Enter") {
      createNewItem(event);
    }
  };

  const closeForm = () => setShowForm(false);
  const openForm = () => setShowForm(true);

  const { _id, title, items } = list;
  return (
    <Draggable draggableId={String(_id)} index={index}>
      {provided => (
        <div
          className="list-container"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(_id)}>
            {provider => (
              <Card>
                <div {...provider.droppableProps} ref={provider.innerRef}>
                  <h4 className="card__title">
                    {title}
                    <span>
                      <i
                        title="delete list"
                        onClick={deleteLst}
                        className="fa fa-trash delete-list-icon"
                      ></i>
                    </span>
                  </h4>
                  {items.map((item, index) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      listId={_id}
                      deleteItem={deleteItm}
                      index={index}
                    />
                  ))}
                  {provider.placeholder}
                </div>

                {showForm ? (
                  <React.Fragment>
                    <Form
                      onSubmit={createNewItem}
                      onKeyDown={handleFormOnKeyDown}
                      ref={newItemFormRef}
                      placeholder="Enter a title.."
                      value={inputValue}
                      onChange={handlechange}
                      btnText="Add Card"
                      onClick={closeForm}
                    />
                  </React.Fragment>
                ) : (
                  <p className="add-another-card" onClick={openForm}>
                    <span className="plus-icon">&#10010;</span> Add another card
                  </p>
                )}
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
