import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/product/';
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3MjczNDI4NzZ9.yw34bUUMIK3IsSNith_1IbBLioEBz_wJ__7XzeIxho0"; // Đừng quên thay thế bằng token thực tế của bạn

// Async Thunks
export const getAllProducts = createAsyncThunk('products/getAll', async (thunkAPI) => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
       
        return response.data.data; // Trả về danh sách sản phẩm
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addProduct = createAsyncThunk('products/add', async (product, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}add`, product, {
            headers: { Authorization: `Bearer ${token}` }
        });
      
        return response.data.data; // Trả về sản phẩm đã thêm
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, product }, thunkAPI) => {
    try {
        const response = await axios.put(`${BASE_URL}update/${id}`, product, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data)
        return response.data; // Trả về sản phẩm đã cập nhật
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${BASE_URL}delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data; // Trả về thông báo xóa thành công
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const uploadProductImages = createAsyncThunk('products/uploadImages', async ({ id, files }, thunkAPI) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    console.log(files)
    try {
        const response = await axios.post(`${BASE_URL}upload/${id}`, formData, {
            
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to upload images" });
    }
});

export const getAllImagesForProduct = createAsyncThunk('products/getAllImages', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}getAllImage/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to fetch product images" });
    }
});

export const viewImage = createAsyncThunk('products/viewImage', async (imageName, thunkAPI) => {
    try {
       
        const response = await axios.get(`${BASE_URL}images/${imageName}`, {
            responseType: 'blob', // To handle image response
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response)

        return URL.createObjectURL(new Blob([response.data])); // Create a URL for the image blob
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to fetch image" });
    }
});



// Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        images: [],
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        message: ''
    },
    reducers: {
        resetStatusAndMessage: (state) => {
            state.status = 'idle';
            state.message = '';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload); // Correctly push the new product
                state.message = action.payload.message || "Product added successfully"; 
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product.id === action.payload.data.id);
                if (index !== -1) {
                    state.items[index] = action.payload.data;
                }
                state.message = action.payload.message;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product.id !== action.payload.data);
                state.message = action.payload.message;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
    
            .addCase(uploadProductImages.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(uploadProductImages.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getAllImagesForProduct.fulfilled, (state, action) => {
                console.log(state.images)
                state.images = action.payload.data;
            })
            .addCase(getAllImagesForProduct.rejected, (state, action) => {
                state.error = action.payload;
            })
         

             .addCase(viewImage.fulfilled, (state, action) => {
            // Thêm URL ảnh vào state
           // state.images.push(action.payload);
        })
        .addCase(viewImage.rejected, (state, action) => {
            console.error("Error fetching image:", action.payload);
        });
    }
});

export const { resetStatusAndMessage } = productSlice.actions;
export default productSlice.reducer;
