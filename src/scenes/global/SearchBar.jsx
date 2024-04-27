import {
    Box,
    IconButton,
    useTheme,
    Menu,
    MenuItem,
    Popover,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link as MuiLink,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase"; // Assuming MUI for InputBase
import SearchIcon from "@mui/icons-material/Search"; // Assuming SearchIcon is imported


function SearchBar({ options, placeholder = "Search for panels" }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); // Access theme colors
    const [anchorEl, setAnchorEl] = useState(null); // State for Popover or Menu

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (link) => {
        handleClose(); // Close the Popover/Menu after selection
        window.location.href = link; // Redirect using window.location.href
    };

    // Render the search bar itself here (same as your previous code)

    return (
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }} onClick={handleClick}>
                <SearchIcon />
            </IconButton>
            {/* Popover or Menu implementation based on preference */}

            {anchorEl && (
                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <List sx={{ p: 0 }}>
                        {options.map((option) => (
                            <MenuItem key={option.label} onClick={() => handleOptionClick(option.link)}>

                                <ListItemText primary={<Typography variant="body2">{option.label}</Typography>} />
                            </MenuItem>
                        ))}
                    </List>
                </Popover>
            )}

            {/* Alternatively, use Menu (uncomment and customize if preferred) */}
            {/* {anchorEl && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'simple-menu',
                    }}
                >
                    {options.map((option) => (
                        <MenuItem onClick={() => handleOptionClick(option.link)} key={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Menu>
            )} */}
        </Box>
    );
}

export default SearchBar;
