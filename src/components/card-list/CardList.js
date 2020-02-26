import React, { useState, useRef, useReducer } from "react";
import axios from "axios";
import "./CardList.css";
import CardItem from "../card-item/CardItem";
import Form from "../form/Form";
import Card from "../card/Card";
import { Droppable } from "react-beautiful-dnd";

const listItemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_LIST_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case "DELETE_LIST_ITEM":
      const filteredItems = state.items.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        items: filteredItems
      };
    default:
      return state;
  }
};

export default function CardItemList({ list, deleteList, updateList }) {
  const initialState = {
    _id: list._id,
    title: list.title,
    items: list.items
  };
  const [listItemReducerState, dispatch] = useReducer(
    listItemReducer,
    initialState
  );
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const newItemFormRef = useRef();

  const createNewItem = async event => {
    event.preventDefault();
    if (inputValue) {
      const newItem = {
        title: inputValue
      };
      const id = listItemReducerState._id;
      const response = await axios.patch(
        `http://localhost:8080/${id}/addItem`,
        newItem
      );
      dispatch({ type: "ADD_NEW_LIST_ITEM", payload: response.data });
      updateList(id, response.data);
      setInputValue("");
      newItemFormRef.current.focus();
    }
  };
  const deleteItem = async (listId, itemId) => {
    const response = await axios.delete(
      `http://localhost:8080/${listId}/deleteItem/${itemId}`
    );
    dispatch({ type: "DELETE_LIST_ITEM", payload: response.data.id });
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

  const { title, items, _id } = listItemReducerState;
  return (
    <Droppable droppableId={String(_id)}>
      {provider => (
        <Card>
          <div {...provider.droppableProps} ref={provider.innerRef}>
            <h4 className="card__title">
              {title}
              <span>
                <i
                  title="delete list"
                  onClick={() => deleteList(_id)}
                  className="fa fa-trash delete-list-icon"
                ></i>
              </span>
            </h4>
            {items.map((item, index) => (
              <CardItem
                key={item.id}
                item={item}
                listId={_id}
                deleteItem={deleteItem}
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
  );
}
