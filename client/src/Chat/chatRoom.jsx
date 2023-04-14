import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
function ChatRoom(props) {
  const user = props.user;
  const messages = props.messages;

  return (
    <ListItem sx={{ px: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={user.profilePictureLink} />
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={messages} />
    </ListItem>
  );
}

export default ChatRoom;
