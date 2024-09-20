import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Modal,
  Input ,
  TextField, 
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import MyChart from "components/MyChart";
import MyChart2 from "components/MyChart2";
import { getAlll, getAlll1, deleteStudent, addStudent, resetStatusAndMessage, editStudent ,searchByName,searchByYear,searchStudentsXepLoai,searchAll} from '../../redux/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const [currentPage, setCurrentPage] = useState(0)
  const limit = 6
  const { totalPages, students } = useSelector((state) => state.student);
  console.log(students)
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAlll({ currentPage, limit }))
}, [currentPage])
useEffect(()=>{
  dispatch(getAlll1())
},[dispatch])

const handlePageClick = (event) => {
  setCurrentPage(event.selected)
}
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  // Thêm các cột khác nếu cần
];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 5, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 6, lastName: 'Targaryen', firstName: 'Cersei', age: 30 },
    { id: 7, lastName: 'Stark', firstName: 'Sansa', age: 23 },
  ];
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const [name, setName] = useState('');
const handleChange1 = (event) => {
  setName(event.target.value);
  
};
console.log(name)
  return (
    <Box m="1.5rem 2.5rem">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  value={name}
        onChange={handleChange1} />
<TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  value={name}
        onChange={handleChange1} />
        <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  value={name}
        onChange={handleChange1} />
        <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  value={name}
        onChange={handleChange1} />
        <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  value={name}
        onChange={handleChange1} />
      
        </Box>

      </Modal>
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
        <Button variant="contained" color="success" onClick={handleOpen}>
        thêm
      </Button>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          {/* loading ne */}
          {/* <OverviewChart view="sales" isDashboard={true} /> */}
          <MyChart/>
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
   
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
        rows={students} // Dữ liệu từ Redux
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          {/* <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography> */}
          <MyChart2/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;