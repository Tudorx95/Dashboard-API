import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//database infos will be necessary here
import { mockDataContacts } from "../../data/mockData"
import Header from "../../components/Header";

const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //here is the ID attribute of the table elements
    // You can reffer to another elements by importing the right table  
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registerId", headerName: "Register ID" },
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
            field: "zipCode",
            headerName: "ZipCode",
            flex: 1
        }
    ];

    return (
        <Box m="20px">
            <Header title="CONTACTS" subtitle="List of Contacts for future members" />
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
                    //filters for 
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`
                    }
                }}
            >
                <DataGrid
                    rows={mockDataContacts}
                    columns={columns}
                    //deprecated use of components attribute
                    // used for filtering the tables
                    slots={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Contacts;