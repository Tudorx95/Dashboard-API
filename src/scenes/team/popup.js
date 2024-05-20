import { useState } from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";

const OptionsPopup = ({ onClose, initialAccess }) => {
  const [selectedAccess, setSelectedAccess] = useState(initialAccess); // Use initialAccess for pre-selected option

  const handleAccessChange = (event) => {
    setSelectedAccess(event.target.value);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to access level (e.g., API call, update state in parent component)
    onClose(selectedAccess); // Call onClose function provided by parent component (optional)
  };

  return (
    <Box className="popup">
      <Typography variant="h6">Change Access Level:</Typography>
      <Box>
        <Select value={selectedAccess} onChange={handleAccessChange}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
      </Box>
      <Button onClick={handleSaveChanges}>Save Changes</Button>
    </Box>
  );
};

export default OptionsPopup;
