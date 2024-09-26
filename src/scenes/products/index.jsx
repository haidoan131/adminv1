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
  Paper,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,resetStatusAndMessage ,addProduct,deleteProduct,updateProduct} from "redux/productSlice";
import { getAlll1} from '../../redux/cateSlice';
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

const Products = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAlll1());
    // Optionally, reset status and message after fetching
    return () => {
      dispatch(resetStatusAndMessage());
    };
  }, [dispatch]);
  const { items, status, error } = useSelector((state) => state.products);
  const { cates} = useSelector((state) => state.cate); 
console.log(items)
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', width: 150, flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    {
      field: 'action',
      headerName: 'Actions',
     flex:1,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenEdit(params.row.id)}
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
//delete 
const handle_delete = (id) => {
  dispatch(deleteProduct(id));
};


  const rows = items ? items.map(product => ({
    ...product,
    category: product.category?.name, // Extract category name
  })) : [];

  const paginationModel = { page: 0, pageSize: 5 };
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
  
  //add
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: { id: '' } });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProduct(newProduct)); // Adjust the action to accept product data
    handleClose(); // Close modal after submission
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value,
      category: { id: name === 'category' ? value : prev.category.id } // Update category id
    }));
  };

  //update
  const [openEdit, setOpenEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const handleOpenEdit = (id) => {
    const productToEdit = items.find(item => item.id === id);
    if (productToEdit) {
      setNewProduct({ 
        name: productToEdit.name, 
        price: productToEdit.price, 
        description: productToEdit.description, 
        category: { id: productToEdit.category.id } 
      });
      setEditProductId(id);
      setOpenEdit(true);
    }
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditProductId(null);
    setNewProduct({ name: '', price: '', description: '', category: { id: '' } }); // Reset form
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
  
    await dispatch(updateProduct({ id: editProductId, product: newProduct }));
    handleCloseEdit();
    toast.success("Product updated successfully!");
  };



  return (
    <Box m="1.5rem 2.5rem">
           <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={style}>
          <form onSubmit={handleSubmitEdit}>
            <TextField fullWidth label="Name" variant="outlined" name="name" value={newProduct.name} onChange={handleInputChange} />
            <TextField fullWidth label="Price" variant="outlined" name="price" type="number" value={newProduct.price} onChange={handleInputChange} />
            <TextField fullWidth label="Description" variant="outlined" name="description" value={newProduct.description} onChange={handleInputChange} />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={newProduct.category.id} onChange={handleInputChange}>
                {cates.map(cate => (
                  <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="success">Update Product</Button>
          </form>
        </Box>
      </Modal>
      {/* model add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              sx={{ m: 1 }}
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleInputChange}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newProduct.category.id}
                onChange={handleInputChange}
              >
                {cates && cates.map((cate) => (
                  <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
            >
              Add Product
            </Button>
          </form>
        </Box>
      </Modal>
      
    <h1>Products</h1>
     <Button variant="contained" color="success" onClick={handleOpen} >
        Add Product
      </Button>
      <Paper sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
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

export default Products;
