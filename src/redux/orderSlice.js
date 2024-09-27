import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/order/';
const token = "your_actual_token_here"; // Thay thế bằng token thực tế của bạn

// Set up axios defaults
//axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Async Thunks
export const getAllOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get(BASE_URL);
        console.log(response.data.data)
        return response.data.data; // Trả về danh sách đơn hàng
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addOrder = createAsyncThunk('orders/add', async (order, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}add`, order);
        return response.data.data; // Trả về đơn hàng đã thêm
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateOrder = createAsyncThunk('orders/update', async ({ id, order }, thunkAPI) => {
    try {
        const response = await axios.put(`${BASE_URL}${id}`, order);
        return response.data.data; // Trả về đơn hàng đã cập nhật
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteOrder = createAsyncThunk('orders/delete', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${BASE_URL}${id}`);
        return response.data.data; // Trả về thông báo xóa thành công
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getOrderById = createAsyncThunk('orders/getById', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}${id}`);
        return response.data; // Trả về thông tin đơn hàng
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Slice
const orderSlice = createSlice({
    name: 'orders',
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
            .addCase(getAllOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
               
                state.items = action.payload.data;
                console.log(state.items.data)
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.items.push(action.payload); // Thêm đơn hàng mới vào danh sách
                state.message = "Order added successfully";
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.items.findIndex(order => order.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload; // Cập nhật đơn hàng
                }
                state.message = "Order updated successfully";
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.items = state.items.filter(order => order.id !== action.payload.id); // Xóa đơn hàng
                state.message = "Order deleted successfully";
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                // Có thể lưu thông tin đơn hàng vào state nếu cần
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { resetStatusAndMessage } = orderSlice.actions;
export default orderSlice.reducer;
