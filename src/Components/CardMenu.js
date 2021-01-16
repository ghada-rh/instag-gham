import "../Style/CardMenu.css";
import { ReactComponent as Inbox } from "../images/Inbox.svg";
import { ReactComponent as Comments } from "../images/Comments.svg";
import { ReactComponent as Notifications } from "../images/Notification.svg";
import { ReactComponent as Bookmark } from "../images/BookMark.svg";

function CardMenu() {
  return (
    <div className="cardMenu">
      <div className="interactions">
        <Notifications className="icon" />
        <Comments className="icon" />
        <Inbox className="icon" />
      </div>
      <Bookmark className="icon" />
    </div>
  );
}

export default CardMenu;