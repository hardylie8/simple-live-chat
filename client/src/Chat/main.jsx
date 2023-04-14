import {
  Typography,
  Box,
  Grid,
  List,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import ChatRoom from "./chatRoom";
import ChatMessage from "./chatMessages";
import "./../App.css";
import axios from "axios";
import moment from "moment";
const ws = new WebSocket("ws://localhost:3000/cable");

function Chat() {
  const navigate = useNavigate();
  const [guid, setGuid] = useState("");
  const [activeUser, setActiveUser] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const messagesContainer = document.getElementById("messages");
  ws.onopen = () => {
    console.log("Connected to websocket server");
    setGuid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: guid,
          channel: "MessagesChannel",
        }),
      })
    );
  };
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.type === "ping") return;
    if (data.type === "welcome") return;
    if (data.type === "confirm_subscription") return;
    const message = data.message;
    setMessages([...messages, message]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = e.target.payload.value;
    e.target.payload.value = "";

    await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: payload,
        receiver_id: users[0].id,
        sender_id: activeUser.id,
      }),
    });
  };

  const getMessages = async () => {
    const response = await axios.get("http://localhost:3000/messages");
    const results = response.data
      .sort((x, y) => {
        return new Date(x.created_at) < new Date(y.created_at) ? 1 : -1;
      })
      .reverse();
    resetScroll();
    setMessage(results[0]);
    setMessages(results);
  };

  const getUsers = async () => {
    let activeUser = localStorage.getItem("user");
    if (activeUser === null) {
      navigate("/");
    }
    activeUser = JSON.parse(activeUser);
    setActiveUser(activeUser);

    const response = await axios.get("http://localhost:3000/users");
    let filterResults = response.data.filter((object) => {
      return object.id != activeUser.id;
    });
    setUsers(filterResults);
  };

  const resetScroll = () => {
    if (!messagesContainer) return;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  useEffect(() => {
    getMessages();
    getUsers();
  }, []);

  useEffect(() => {
    resetScroll();
  }, [messages]);

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100%",
        px: 1,
        overflowX: "hidden",
      }}
      spacing={2}
    >
      <Grid
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
        item
        xs={6}
        md={3}
        container
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            px: 2,
            background: "#fff",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ my: 2 }}>
            Chats
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              height: "30px",
              background: "#E1E7F7",
              p: 1,
            }}
          >
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <input
              placeholder=" Search or create New Chat"
              style={{
                height: "100%",
                width: "100%",
                border: "none",
                background: "none",
              }}
              disabled
            ></input>
          </Box>
          <Box
            className="customScrollBar"
            sx={{
              maxWidth: 360,
              overflow: "auto",
            }}
          >
            <List>
              {users.map((user, index) => {
                let time = "";
                if (message !== undefined) {
                  let time = moment(message.created_at).fromNow();
                }

                return (
                  <ChatRoom
                    key={index}
                    user={user}
                    activeUser={activeUser}
                    messages={time}
                  />
                );
              })}
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
        item
        xs={6}
        md={9}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
          className="customScrollBar"
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              overflow: "auto",
              flexDirection: "column",
            }}
            id="messages"
          >
            {messages.map((message, index) => {
              return (
                <ChatMessage key={index} user={activeUser} message={message} />
              );
            })}
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                m: 1,
                p: 1,
                background: "#fff",
                borderRadius: "20px",
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size="small"
                name="payload"
              />
              <IconButton
                color="primary"
                sx={{ background: "#E1E7F7", ml: 2, alignSelf: "end" }}
                aria-label="add to shopping cart"
                type="submit"
              >
                <SendIcon />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Chat;
