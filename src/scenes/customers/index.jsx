import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  const rows = [
    {
      _id: "1",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phoneNumber: "0901234567",
      country: "Vietnam",
      occupation: "Engineer",
      role: "User",
    },
    {
      _id: "2",
      name: "Trần Thị B",
      email: "b@example.com",
      phoneNumber: "0912345678",
      country: "Vietnam",
      occupation: "Designer",
      role: "Admin",
    },
    {
      _id: "3",
      name: "Lê Văn C",
      email: "c@example.com",
      phoneNumber: "0923456789",
      country: "Vietnam",
      occupation: "Manager",
      role: "User",
    },
    {
      _id: "4",
      name: "Phạm Thị D",
      email: "d@example.com",
      phoneNumber: "0934567890",
      country: "Vietnam",
      occupation: "Developer",
      role: "User",
    },
    {
      _id: "5",
      name: "Nguyễn Văn E",
      email: "e@example.com",
      phoneNumber: "0945678901",
      country: "Vietnam",
      occupation: "Marketer",
      role: "User",
    },
    {
      _id: "6",
      name: "Trần Thị F",
      email: "f@example.com",
      phoneNumber: "0956789012",
      country: "Vietnam",
      occupation: "Analyst",
      role: "Admin",
    },
    {
      _id: "7",
      name: "Lê Văn G",
      email: "g@example.com",
      phoneNumber: "0967890123",
      country: "Vietnam",
      occupation: "Sales",
      role: "User",
    },
    {
      _id: "8",
      name: "Phạm Thị H",
      email: "h@example.com",
      phoneNumber: "0978901234",
      country: "Vietnam",
      occupation: "Support",
      role: "User",
    },
    {
      _id: "9",
      name: "Nguyễn Văn I",
      email: "i@example.com",
      phoneNumber: "0989012345",
      country: "Vietnam",
      occupation: "HR",
      role: "Admin",
    },
    {
      _id: "10",
      name: "Trần Thị J",
      email: "j@example.com",
      phoneNumber: "0990123456",
      country: "Vietnam",
      occupation: "Consultant",
      role: "User",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
         
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
