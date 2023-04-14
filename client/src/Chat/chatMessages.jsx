import { Typography } from "@mui/material";

function ChatMessage(props) {
  const user = props.user;
  const message = props.message;
  return (
    <Typography
      variant="subtitle1"
      sx={[
        { width: "fit-content", maxWidth: "50%", p: 1, mx: 2, my: 1 },
        user["id"] != message.sender_id && {
          background: "#E1E7F7",
          borderRadius: "15px 15px 15px 0",
          alignSelf: "start",
        },
        user["id"] == message.sender_id && {
          background: "#A6A4AE",
          borderRadius: "15px 15px 0 15px ",
          alignSelf: "end",
        },
      ]}
    >
      {message.payload}
    </Typography>
  );
}

export default ChatMessage;
