import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback
} from "react";
import axios from "axios";
import "./CardListPreview.css";
import CardList from "../card-list/CardList";
import Form from "../form/Form";
import Card from "../card/Card";

const listReducer = (state, action) => {
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
      const flteredList = state.lists.filter(
        list => list._id !== action.payload
      );
      return {
        ...state,
        lists: flteredList
      };
    case "UPDATE_LIST":
      const newState = { ...state };
      const listToBeUpdate = state.lists.find(
        list => list._id === action.payload.listId
      );
      listToBeUpdate.items = [...listToBeUpdate.items, action.payload.item];
      return {
        ...newState
      };
    case "DRAG_HAPPENED":
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId
      } = action.payload;
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

export default function CardListPreview({
  isDragged,
  resetDragData,
  ...otherProps
}) {
  const [listReducerState, dispatch] = useReducer(listReducer, { lists: [] });
  const [inputValue, setInputValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const newListFormreF = useRef();

  const getAllList = async () => {
    const response = await axios.get("http://localhost:8080");
    dispatch({ type: "GET_ALL_LISTS", payload: response.data });
  };

  const addNewList = async event => {
    event.preventDefault();
    const newList = { title: inputValue };
    const response = await axios.post("http://localhost:8080", newList);
    dispatch({ type: "ADD_NEW_LIST", payload: response.data });
    setInputValue("");
    newListFormreF.current.focus();
  };

  const deleteList = async id => {
    const response = await axios.delete(
      `http://localhost:8080/deleteList/${id}`
    );
    dispatch({ type: "DELETE_LIST", payload: response.data.id });
  };

  const updateList = (listId, item) =>
    dispatch({ type: "UPDATE_LIST", payload: { listId, item } });

  const dragHappened = useCallback(() => {
    const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId
    } = otherProps;

    dispatch({
      type: "DRAG_HAPPENED",
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId
      }
    });
  }, [otherProps]);

  useEffect(() => {
    if (isDragged) {
      dragHappened();
      resetDragData();
    }
  }, [isDragged, resetDragData, dragHappened]);

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
  console.log(listReducerState);
  return (
    <div className="card-list-preview">
      {listReducerState.lists.map(list => (
        <CardList
          key={list._id}
          list={list}
          deleteList={deleteList}
          updateList={updateList}
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
    </div>
  );
}
