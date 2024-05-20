import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//database infos will be necessary here
import { mockDataTeam } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState } from "react";
import OptionsPopup from "./popup";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const handleBoxClick = () => {
        setIsEditing(true);
    }

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    const handleOpenPopup = (user) => {
        setIsPopupOpen(true);
        setSelectedUser(user); // Pass user access level to OptionsPopup
    };

    const handleClosePopup = (newAccess) => {
        // Update user access level in your data (if applicable)
        setIsPopupOpen(false);
    };

    //here is the ID attribute of the table elements
    // You can reffer to another elements by importing the right table  
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left"
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1
        },
        {
            field: "city",
            headerName: "City",
            flex: 1
        },
        {
            field: "access",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <div>
                        <Box
                            width="100%"
                            m="0 auto"  //margins top-bottom left-right
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                access === "admin"
                                    ? colors.greenAccent[600]
                                    : colors.greenAccent[700]
                            }
                            borderRadius="4px"
                            onClick={handleBoxClick}
                        >
                            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                            {access === "manager" && <SecurityOutlinedIcon />}
                            {access === "user" && <LockOpenOutlinedIcon />}
                            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                                {access}
                            </Typography>
                        </Box>
                        {isEditing &&
                            <OptionsPopup
                                onClose={handleClosePopup}
                                initialAccess={selectedUser?.access} // Access level from selected user
                            />
                        }
                    </div>
                )                                   //ml=margin left
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box
                m="40px 0 0 0"
                height="75vh"   //vh=viewport height
                // here those classes where searched in the webpage for 
                // future personalization. Also we can customize the 
                // attributes for those from database/ column variable
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    },

                }}
            >
                <DataGrid
                    rows={mockDataTeam}
                    columns={columns}
                />
            </Box>
        </Box>
    )
}

export default Team;