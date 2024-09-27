import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // State management
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(), // Format date
    },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "nameproduct", headerName: "Products", flex: 1 },
    {
      field: "phone",
      headerName: "Number",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  const rows = [
    { _id: "1", name: "Nguyễn Văn A", createdAt: "2023-09-01T10:00:00Z", address: "123 Đường ABC, Quận 1, TP.HCM", nameproduct: "Sản phẩm A", phone: "0901234567", cost: 100000 },
    { _id: "2", name: "Trần Thị B", createdAt: "2023-09-02T11:30:00Z", address: "456 Đường DEF, Quận 2, TP.HCM", nameproduct: "Sản phẩm B", phone: "0912345678", cost: 150000 },
    { _id: "3", name: "Lê Văn C", createdAt: "2023-09-03T09:15:00Z", address: "789 Đường GHI, Quận 3, TP.HCM", nameproduct: "Sản phẩm C", phone: "0923456789", cost: 200000 },
    { _id: "4", name: "Phạm Thị D", createdAt: "2023-09-04T14:20:00Z", address: "321 Đường JKL, Quận 4, TP.HCM", nameproduct: "Sản phẩm D", phone: "0934567890", cost: 250000 },
    { _id: "5", name: "Nguyễn Văn E", createdAt: "2023-09-05T08:45:00Z", address: "654 Đường MNO, Quận 5, TP.HCM", nameproduct: "Sản phẩm E", phone: "0945678901", cost: 300000 },
    { _id: "6", name: "Trần Thị F", createdAt: "2023-09-06T17:10:00Z", address: "987 Đường PQR, Quận 6, TP.HCM", nameproduct: "Sản phẩm F", phone: "0956789012", cost: 350000 },
    { _id: "7", name: "Lê Văn G", createdAt: "2023-09-07T13:00:00Z", address: "135 Đường STU, Quận 7, TP.HCM", nameproduct: "Sản phẩm G", phone: "0967890123", cost: 400000 },
    { _id: "8", name: "Phạm Thị H", createdAt: "2023-09-08T12:30:00Z", address: "246 Đường VWX, Quận 8, TP.HCM", nameproduct: "Sản phẩm H", phone: "0978901234", cost: 450000 },
    { _id: "9", name: "Nguyễn Văn I", createdAt: "2023-09-09T15:45:00Z", address: "357 Đường YZ, Quận 9, TP.HCM", nameproduct: "Sản phẩm I", phone: "0989012345", cost: 500000 },
    { _id: "10", name: "Trần Thị J", createdAt: "2023-09-10T16:00:00Z", address: "468 Đường ABCD, Quận 10, TP.HCM", nameproduct: "Sản phẩm J", phone: "0990123456", cost: 550000 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
          loading={false} // Replace with your loading state
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
