import React, { useState, useRef, useEffect, useReducer } from "react";
import axios from "axios";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

import "./CardListPreview.css";
import CardList from "../card-list/CardList";
import Form from "../form/Form";
import Card from "../card/Card";
import Spinner from "../spinner/Spinner";
import { listReducer } from "./list-reducer";

export default function CardListPreview() {
  const [listReducerState, dispatch] = useReducer(listReducer, {
    lists: [],
    isLoading: true
  });
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const newListFormreF = useRef();

  const getAllList = async () => {
    const response = await axios.get("https://trello-apis.herokuapp.com");
    dispatch({ type: "GET_ALL_LISTS", payload: response.data });
  };

  const addNewList = async event => {
    event.preventDefault();
    const newList = { title: inputValue };
    const response = await axios.post(
      "https://trello-apis.herokuapp.com",
      newList
    );
    dispatch({ type: "ADD_NEW_LIST", payload: response.data });
    setInputValue("");
    newListFormreF.current.focus();
  };

  const deleteList = async id => {
    const response = await axios.delete(
      `https://trello-apis.herokuapp.com/deleteList/${id}`
    );
    dispatch({ type: "DELETE_LIST", payload: response.data.id });
  };

  const createItem = async (listId, newItem) => {
    const response = await axios.patch(
      `https://trello-apis.herokuapp.com/${listId}/addItem`,
      newItem
    );
    dispatch({
      type: "ADD_NEW_LIST_ITEM",
      payload: { item: response.data, listId }
    });
  };

  const deleteItem = async (listId, itemId) => {
    const response = await axios.delete(
      `https://trello-apis.herokuapp.com/${listId}/deleteItem/${itemId}`
    );
    dispatch({
      type: "DELETE_LIST_ITEM",
      payload: { parentId: listId, itemDeleteId: response.data.id }
    });
  };

  useEffect(() => {
    getAllList();
  }, []);

  const handleFormOnKeyDown = event => {
    if (event.key === "Enter") {
      addNewList(event);
    }
  };
  const handlechange = event => {
    setInputValue(event.target.value);
  };
  const closeForm = () => setShowForm(false);
  const openForm = () => setShowForm(true);

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
    dispatch({
      type: "DRAG_HAPPENED",
      payload: {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexEnd: destination.index,
        droppableIndexStart: source.index,
        draggableId,
        type
      }
    });
  };

  if (listReducerState.isLoading === true) {
    return <Spinner />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-list" direction="horizontal" type="list">
        {provided => (
          <div
            className="card-list-preview"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listReducerState.lists.map((list, index) => (
              <CardList
                key={list._id}
                list={list}
                deleteList={deleteList}
                createItem={createItem}
                deleteItem={deleteItem}
                index={index}
              />
            ))}
            <Card>
              {showForm ? (
                <Form
                  onSubmit={addNewList}
                  onKeyDown={handleFormOnKeyDown}
                  ref={newListFormreF}
                  placeholder="Enter a title.."
                  value={inputValue}
                  onChange={handlechange}
                  btnText="Add new list"
                  onClick={closeForm}
                />
              ) : (
                <p onClick={openForm}>
                  <span className="plus-icon">&#10010;</span> Add another list
                </p>
              )}
            </Card>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
