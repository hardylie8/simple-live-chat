import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import "./index.css";
function App() {
  const [users, setUsers] = useState([]);
  const [activeCard, setActiveCard] = useState(-1);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    localStorage.clear();
    setUsers(response.data);
  };

  const handleActiveCard = (cardId) => {
    const activeUser = JSON.stringify(users[cardId]);
    setActiveCard(cardId);
    localStorage.setItem("user", activeUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = () => {
    navigate("/chats");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ mb: 3 }} variant="h3" gutterBottom>
        Choose User
      </Typography>
      <Box sx={{ display: "flex", width: "100vw", justifyContent: "center" }}>
        {users.map((user, index) => {
          return (
            <Card
              key={index}
              className="user-card-active "
              sx={{
                mx: 2,
                background: activeCard == index ? "#AA77FF" : "#fff",
                color: activeCard == index ? "#fff" : "#121212",
              }}
            >
              <CardActionArea
                sx={{ display: "flex", alignItems: "center", p: 1 }}
                onClick={() => handleActiveCard(index)}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 55, height: 55, borderRadius: "50%" }}
                  image={`${user.profilePictureLink}`}
                  alt="profile"
                />
                <CardContent>
                  <Typography component="div" variant="h5">
                    {user.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          background: "#AA77FF",
        }}
        size="large"
        disabled={activeCard == -1}
        onClick={handleClick}
      >
        <Typography variant="h5" gutterBottom>
          Start Chatting
        </Typography>
      </Button>
    </Box>
  );
}

export default App;
