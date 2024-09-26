import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/admin/cate/';


const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJleHAiOjE3MjczMjM2MzB9._Dqff0_DV9xL4ry7ql9e3QBhznnpd6Q8ZQ0W174i4wc";
export const getAlll1 = createAsyncThunk("cate/getAlll1", async ( thunkAPI) => {
    
    const url = BASE_URL;
    console.log(token)
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}` // Thêm token vào header
            }
        });
        console.log(response.data);
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || { message: 'Network error' }); // Trả về lỗi nếu có
    }
});

export const addNew= createAsyncThunk('cate/addNew', async (cate,thunkAPI) => {
    const url= BASE_URL+`add`;
    try {
      const response = await axios.post(url, cate,{
        headers: {
            Authorization: `Bearer ${token}` // Thêm token vào header
        }
      });
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });

  export const deleteCate= createAsyncThunk('cate/deleteCate', async (id,thunkAPI) => {
    const url= BASE_URL+`delete/${id}`;
   try {
     const response = await axios.delete(url,{
        headers: {
            Authorization: `Bearer ${token}` // Thêm token vào header
        }
      });
     return response.data; // Trả về dữ liệu từ phản hồi
   } catch (error) {
     return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
   }
 });

 export const edit= createAsyncThunk('cate/edit', async ({id,cate},thunkAPI) => {
    const url= BASE_URL+`update/${id}`;
    try {
   
      const response = await axios.put(url,cate,{
        headers: {
            Authorization: `Bearer ${token}` // Thêm token vào header
        }
      });
      return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Trả về lỗi nếu có
    }
  });



export const cateSlice = createSlice({
    name: "cate",
    initialState: {
        cates: [],
        totalPages: 10,
        status:'idle',
        error:null,
        message:""

    },
    reducers: {
        resetStatusAndMessage:(state)=>{
            state.status=null;
            state.message=""
            state.error=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAlll1.pending, (state) => {
                state.status = 'loading'; // Thay đổi trạng thái khi đang tải
            })
            .addCase(getAlll1.fulfilled, (state, action) => {
                state.cates = action.payload.data; // Cập nhật danh sách danh mục
                state.status = 'succeeded'; // Đặt trạng thái thành công
            })
            .addCase(getAlll1.rejected, (state, action) => {
                state.status = 'failed'; // Đặt trạng thái lỗi
                state.error = action.payload; // Lưu trữ lỗi
            })
            .addCase(addNew.fulfilled, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.cates = [...state.cates, action.payload.data];
              })
              .addCase(addNew.rejected, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.error=action.payload.data
              })
              .addCase(deleteCate.fulfilled, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.cates = state.cates.filter(cate => cate.id !== action.payload.data);
              })
              .addCase(deleteCate.rejected, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.error=action.payload.data
              })
              .addCase(edit.fulfilled, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.cates = state.cates.map(cate =>
                    cate.id === action.payload.data.id ? action.payload.data : cate
              );
              })
              .addCase(edit.rejected, (state, action) => {
                state.status=action.payload.status
                state.message=action.payload.message
                state.error=action.payload.data
              })
          
    }
    
})
export const {resetStatusAndMessage}=cateSlice.actions
export default cateSlice.reducer