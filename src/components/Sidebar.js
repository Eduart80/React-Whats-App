import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./Firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [room, setRoom] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("room").onSnapshot((snapshot) =>
      setRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      //clean up real time listener
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="sidebar">
        <div className="sibebar__header">
          <Avatar className={user?.photoURL} />
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLarge />
            </IconButton>
            <IconButton>
              <Chat />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="sidebar__search">
          <div className="search__contaienr">
            <SearchOutlined />
            <input placeholder="Search here" type="text" />
          </div>
        </div>
        <div className="sidebar__chat">
          <SidebarChat addNewChat />
          {room.map((room) => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
