import React, { useState } from "react";
import CardListPreview from "./components/card-list-preview/CardListPreview";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import "./components/menu/Menu.css";
function App() {
  const [bgColor, setBgColor] = useState("color-1");

  const changeBgColor = color => {
    setBgColor(color);
  };
  return (
    <div className="board" id={`${bgColor}`}>
      <Header />
      <Menu changeBgColor={changeBgColor} bgColor={bgColor} />
      <CardListPreview />
    </div>
  );
}

export default App;
