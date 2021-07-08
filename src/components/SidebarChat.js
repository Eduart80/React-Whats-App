import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import "./SidebarChat.css";
import db from "./Firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter roomchat name");
    if (roomName) {
      db.collection("room").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/room/${id}`}>
      <div>
        <div className="sidebarChat">
          <Avatar
            src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
          />
          <div className="sidebarChat__info">
            <h5>{name}</h5>
            <p>Last message...</p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h4>Add new chat room</h4>
    </div>
  );
}

export default SidebarChat;
