import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Modal,
  TextField,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getAlll1,addNew,deleteCate,edit} from '../../redux/cateSlice';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
 

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};



const Cate = () => {
  const [updateCateData, setUpdateCateData] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = (row) => {
    setUpdateCateData(row);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setUpdateCateData(null);
  };

  const handleUpdateChange = (e) => {
    const { value } = e.target;
    setUpdateCateData(prevData => ({ ...prevData, name: value }));
  };

  const handle_update = () => {

    if (updateCateData) {
      dispatch(edit({ id: updateCateData.id, cate: updateCateData }));
      toast.success(`Updated successfully.`);
      setUpdateOpen(false);
      setUpdateCateData(null);
    }
    
  };

  const columns = [
    { field: 'id', headerName: 'ID',  flex: 1,},
    { field: 'name', headerName: 'Name', width: 150, flex: 1, },
    {
      field: 'action',
      headerName: 'Actions',
     flex:1,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateOpen(params.row)}
            style={{ marginRight: '10px' }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleButtonClick(params.row)}
          >
            Delete
          </Button>
        </div>

        
      ),
    }
  ];
  
  const handleButtonClick = (row) => {
    // console.log('Button clicked for row:', row);
    // Thực hiện các hành động khác tại đây
    toast.info(
      <div>
        <span>Button clicked for row: {row.name}</span>
        <Button onClick={() => performAction(row)} color="primary" style={{ marginLeft: '10px' }}>
          OK
        </Button>
      </div>,
      {
        position: "top-center",
        autoClose: true, // Không tự động đóng
      }
    );

    const performAction = (row) => {
      // Thực hiện hành động với hàng
      console.log('Performing action for row:', row);
      toast.success(`Action performed for row: ${row.name}`);

      
      handle_delete(row.id)


    };


  };

  const paginationModel = { page: 0, pageSize: 5 };

  const [name, setName] = useState('');
    const {  cates } = useSelector((state) => state.cate);
    const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAlll1())
   
  },[dispatch])
  console.log(cates)

  //add new
  const [cate,setCate]=useState({
    name:"cate1"
  })
  const handle_add = () => {
    dispatch(addNew(cate));
  };


//delete 
const handle_delete = (id) => {
  dispatch(deleteCate(id));
};

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange1 = (event) => {
    setName(event.target.value);
    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCate(prevStudent => ({
      ...prevStudent,
      [name]: value
    }));
  
  };
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

const style2 = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
    <Box m="1.5rem 2.5rem">
          {/* Modal for Updating Category */}
          <Modal open={updateOpen} onClose={handleUpdateClose}>
        <Box sx={style}>
          <TextField fullWidth label="Update Name" variant="outlined" value={updateCateData?.name || ''} onChange={handleUpdateChange} />
          <Button type="submit" fullWidth variant="contained" onClick={handle_update}>
            Update Category
          </Button>
        </Box>
      </Modal>


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
        <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="name" variant="outlined"  name="name" value={cate.name}
        onChange={handleChange} />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handle_add}
            >
             Add Category
            </Button>
        </Box>

      </Modal>
     <h1>Category</h1>
     <Button variant="contained" color="success" onClick={handleOpen} >
        Add Category
      </Button>
     <Paper sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={cates}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    <ToastContainer />
    </Box>
  );
};

export default Cate;
