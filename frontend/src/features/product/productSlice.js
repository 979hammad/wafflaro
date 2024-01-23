import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// const api = "https://wafflaro-server.vercel.app/api/v1/items";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (searchItem) => {
    try {
      const response = await axios.get(`/api/v1/items/searchitem`, {
        params: {
          searchItem: searchItem,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addItem = createAsyncThunk('product/addItem', async (data)=> {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/v1/items/addnew`, data ,  {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    }catch(error){
      throw error
    }
}) 

export const singleItem = createAsyncThunk('product/singleItem', async(id)=>{
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/v1/items/getsingleitem/${id}`)
    return response.data
  }catch(error){
    throw error
  }
})

export const updateitem = createAsyncThunk('product/updateitem', async(payload)=>{
  try{
    const { id, data } = payload;
    console.log(id, data)
    const token = localStorage.getItem('token');
    const response = await axios.post(`/api/v1/items/updateitem/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }catch(error){
    throw error
  }
})

export const headerImage = createAsyncThunk('product/headerImage', async(payload)=>{
  try{
    const { id, data } = payload;
    const token = localStorage.getItem('token');
    const response = await axios.post(`/api/v1/items/addheaderimg/${id}`,data ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }catch(error){
    throw error
  }
})

export const getHeaderImage = createAsyncThunk('product/getHeaderImage', async()=>{
  try{
    const response = await axios.get(`/api/v1/items/getheaderimg`)
    return response.data
  }catch(error){
    throw error
  }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async(id)=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/v1/items/deleteitem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    }catch(error){
      throw error
    }
})

const initialState = {
  items: [],
  loading: "idle",
  error: null,
  singleItem : {
    itemName : "", description : "", price : "", category : "" , 
    itemImage : {
      filename : "",
      path : ""
    }
  },
  hImages: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        state.items = action.payload.groupedItems
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        toast.success("Product Added Successfully")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(singleItem.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(singleItem.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        state.singleItem = action.payload.gotSingleItem
      })
      .addCase(singleItem.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        toast.error("Unable to delete Product")
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        toast.success(action.payload.message)
        setTimeout(() => {
          window.location.reload();
        }, 500)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        toast.error("Unable to delete Product")
      })
      .addCase(updateitem.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(updateitem.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        toast.success("Item Updated")
        state.singleItem = action.payload.item;
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(updateitem.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        toast.error("Not updated")
      })
      .addCase(headerImage.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(headerImage.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        toast.success("Header Updated")
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(headerImage.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        toast.error("Header image not updated")
      })
      .addCase(getHeaderImage.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getHeaderImage.fulfilled, (state, action) => {
        state.loading = "idle";
        state.error = null;
        state.hImages = action.payload.hImages
      })
      .addCase(getHeaderImage.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
  },
});

export const productData = (state) => state.items;
export const loading = (state) => state.loading;
export const gotSingleItem = (state) => state.singleItem;
export const headerImagesArray = (state) => state.hImages;

export default productSlice.reducer;
