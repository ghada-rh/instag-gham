import React from 'react';
import '../Style/Menu.css';
import { ReactComponent as Home } from "../images/Home.svg";
import { ReactComponent as Inbox } from "../images/Inbox.svg";
import { ReactComponent as Explore } from "../images/Explore.svg";
import { ReactComponent as Notifications } from "../images/Notification.svg";


function Menu() {
    return (
    <div className="menu">
      <Home className="icon" />
      <Inbox className="icon" />
      <Explore className="icon" />
      <Notifications className="icon" />
    </div>
    )
}

export default Menu;
