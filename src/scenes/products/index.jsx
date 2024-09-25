import React, { useState } from "react";
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
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";

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
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const columns = [
    { field: 'id', headerName: 'ID',  flex: 1,},
    { field: 'name', headerName: 'Name', width: 150, flex: 1, },
    { field: 'name2', headerName: 'Price', width: 150, flex: 1, },
    { field: 'name1', headerName: 'category', width: 150, flex: 1, },
    { field: 'name3', headerName: 'image', width: 150, flex: 1, },
  ];
  const rows = [
    { id: 1, name: 'Snow'},
    { id: 2, name: 'Lannister'},
    { id: 3, name: 'Lannister'},
    { id: 4, name: 'Targaryen' },
    { id: 5, name: 'Stark' },
    { id: 6, name: 'Targaryen' },
    { id: 7, name: 'Stark'},
  ];
const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box m="1.5rem 2.5rem">
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
     
    </Box>
  );
};

export default Products;
