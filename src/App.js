import React, { useState } from "react";
import CardListPreview from "./components/card-list-preview/CardListPreview";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import "./components/menu/Menu.css";
function App() {
  const [color, setColor] = useState("color-1");

  const changeColor = color => {
    setColor(color);
  };
  return (
    <div className="board" id={`${color}`}>
      <Header />
      <Menu changeColor={changeColor} color={color} />
      <CardListPreview />
    </div>
  );
}

export default App;
