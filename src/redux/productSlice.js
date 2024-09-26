import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/product/';
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3MjczMjM2MzB9._Dqff0_DV9xL4ry7ql9e3QBhznnpd6Q8ZQ0W174i4wc"; // Đừng quên thay thế bằng token thực tế của bạn

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
    for (let file of files) {
        formData.append('files', file);
    }

    try {
        const response = await axios.post(`${BASE_URL}upload/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // Trả về danh sách hình ảnh đã tải lên
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
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
                // Nếu cần cập nhật hình ảnh của sản phẩm, bạn có thể thêm logic ở đây
            })
            .addCase(uploadProductImages.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { resetStatusAndMessage } = productSlice.actions;
export default productSlice.reducer;
