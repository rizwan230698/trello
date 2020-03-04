import React, { useState } from "react";
import "./Menu.css";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

export default function Menu({ color, changeColor }) {
  const [menu, setMenu] = useState(false);
  const showColor = () => {
    document.querySelector(".side-drawer__menu-item").style.display = "none";
    document.querySelector(".colors").style.display = "grid";
  };
  const closeMenu = () => {
    document.querySelector(".side-drawer__menu-item").style.display = "flex";
    document.querySelector(".colors").style.display = "none";
    setMenu(false);
  };
  const showMenu = () => {
    setMenu(true);
  };
  return (
    <React.Fragment>
      <div className="menu">
        <div className="menu left">
          <h3>Things To Be Done</h3>
          <div className="menu-item">
            <StarBorderOutlinedIcon />
          </div>
          <span className="menu-item-divider"></span>
          <div className="menu-item">
            <p>Personal</p>
          </div>
          <span className="menu-item-divider"></span>
          <div className="menu-item">
            <p>Private</p>
          </div>
          <span className="menu-item-divider"></span>
          <div className="menu-avatar" />
          <div className="menu-item">
            <p>Invite</p>
          </div>
        </div>
        <div className="menu right">
          <div className="menu-item">
            <p>Blutter</p>
          </div>
          <div className="menu-item">
            <p onClick={showMenu}>Show menu</p>
          </div>
        </div>
      </div>
      {menu && (
        <div className="side-drawer">
          <h2>
            Menu <span onClick={closeMenu}>&#10005;</span>
          </h2>
          <div onClick={showColor} className="side-drawer__menu-item">
            <span className="bg-color" id={color}></span>
            <p>Change Background</p>
          </div>
          <div className="colors">
            <div
              onClick={() => changeColor("color-1")}
              className="color-item"
              id="color-1"
            ></div>
            <div
              onClick={() => changeColor("color-2")}
              className="color-item"
              id="color-2"
            ></div>
            <div
              onClick={() => changeColor("color-3")}
              className="color-item"
              id="color-3"
            ></div>
            <div
              onClick={() => changeColor("color-4")}
              className="color-item"
              id="color-4"
            ></div>
            <div
              onClick={() => changeColor("color-5")}
              className="color-item"
              id="color-5"
            ></div>
            <div
              onClick={() => changeColor("color-6")}
              className="color-item"
              id="color-6"
            ></div>
            <div
              onClick={() => changeColor("color-7")}
              className="color-item"
              id="color-7"
            ></div>
            <div
              onClick={() => changeColor("color-8")}
              className="color-item"
              id="color-8"
            ></div>
            <div
              onClick={() => changeColor("color-9")}
              className="color-item"
              id="color-9"
            ></div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
