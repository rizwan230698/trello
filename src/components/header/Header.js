import React from "react";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddIcon from "@material-ui/icons/Add";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="items">
        <div className="item">
          <AppsOutlinedIcon style={styles.items} />
        </div>
        <div className="item">
          <HomeOutlinedIcon style={styles.items} />
        </div>
        <div className="item">
          <i className="fa fa-trello"></i>
          <b>Boards</b>
        </div>
        <div className="header-input">
          <input type="search" />
          <i className="fa fa-search" aria-hidden="true"></i>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
      <h2>
        <i className="fa fa-trello"></i>
        Trello
      </h2>
      <div className="items right">
        <div className="item">
          <AddIcon style={styles.items} />
        </div>
        <div className="item">
          <InfoOutlinedIcon style={styles.items} />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon style={styles.items} />
        </div>
        <div className="item avatar" />
      </div>
    </div>
  );
}

const styles = {
  items: {
    fontSize: "24px"
  }
};
