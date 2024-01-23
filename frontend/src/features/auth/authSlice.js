import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const api = "https://wafflaro-server.vercel.app/api/v1/user"

export const loginUser = createAsyncThunk('auth/loginUser', async (userData) => {
  try {
    const response = await axios.post(`${api}/signin`, userData)
    const responseData = {
      userFound: response.data.userFound,
      token: response.data.token,
      role: response.data.userFound.role
    };
    return responseData;
  } catch (error) {
    throw error;
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async(userData) => {
  try {
    const response = await axios.post(`${api}/signup`, userData)
    const responseData = {
      newUser: response.data.newUser,
      token: response.data.token
    }
    return responseData;
  } catch (error) {
    throw error
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async()=>{
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${api}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response;
  }catch (error) {
    throw error;
  }
})

export const userDetails = createAsyncThunk('auth/userDetails', async() => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(`${api}/myprofile`, {
      headers: {
       Authorization: `Bearer ${token}`
      },
    });
    const responseData = {
      user : response.data.user,
      isAdmin : response.data.user.role
    }
    return responseData;
  }catch(error){
    throw error
  }
}) 

export const editProfile = createAsyncThunk('auth/editProfile', async(updatedData) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${api}/editprofile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  }catch(error){
    throw error
  }
})

export const changePassword = createAsyncThunk('auth/changePassword', async(newPass) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${api}/changepassword`, newPass, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  }catch (error) {
    throw error
  }
})

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async() => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${api}/deleteuseraccount`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response;
  }catch(error){
    throw error
  }
})

export const getNumbers = createAsyncThunk('auth/getNumbers', async() => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(`${api}/getnumbers`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  }catch(error){
    throw error
  }
} )

export const changeNumbers = createAsyncThunk('auth/changeNumbers', async(changedNumbers) =>{
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${api}/changenumbers`, changedNumbers,  {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
    }catch(error){
      throw error
    }
})

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async()=> {
   try{
     const token = localStorage.getItem('token');
     const response = await axios.get(`${api}/getallusers`,  {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response.data;
   }catch(error){
    throw error
   }
})

export const deleteSpecificUser = createAsyncThunk('auth/deleteSpecificUser', async(id)=>{
  try{
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${api}/deletespecificuser/${id}`,  {
     headers: {
       Authorization: `Bearer ${token}`
     },
   })
   return response.data;
  }catch(error){
   throw error
  }
})

export const addRemoveAdmin = createAsyncThunk('auth/addRemoveAdmin', async(id)=>{
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${api}/addremoveadmin/${id}`, null,{
     headers: {
       Authorization: `Bearer ${token}`
     },
   })
   return response.data;
  }catch(error){
   throw error
  }
})


const initialState = {
  user: {
    name: "",
    email: "",
    pNumber: ""
  },
  token: null,
  loading: 'idle',
  error: null,
  role: null,
  wNo: null,
  mNo: null,
  isLoggedIn: false,
  allUsers : null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;

        const { userFound, token, role } = action.payload;
        localStorage.setItem("token", token);
        state.user = userFound;
        toast.success('Successfully LoggedIn')
        state.token = token;
        state.role = role;
        state.isLoggedIn = true;
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        toast.error("Email Or Password don't match")
      })
      .addCase(signupUser.fulfilled, (state, action)=>{
        state.loading = 'idle';
        state.error = null;
        toast.success('Account Created Successfully')
        const {newUser, token} = action.payload;
        state.user = newUser;
        state.token = token;
        state.role = newUser.role;
        state.isLoggedIn = true
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(signupUser.rejected, (state, action)=>{
        state.loading = 'idle';
        console.log(action.error.message)
        toast.error("Already Registered. Kindly Login")
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state, action)=>{
        state.loading = 'idle'
        state.error = null;
        localStorage.removeItem("token");
        state.token = null
        state.isLoggedIn = false
        state.user = action.payload.data.message;
        toast.success('Logged Out Successfully')
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(logoutUser.rejected, (state, action)=>{
        state.loading = 'idle'
        toast.error("Please Login First")
        state.error = action.error.message;
      })
      .addCase(userDetails.fulfilled, (state, action)=>{
        state.loading = 'idle'
        state.user = action.payload.user
        state.role = action.payload.isAdmin
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(userDetails.rejected, (state, action)=>{
        state.loading = 'idle',
        state.error = action.error.message
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.error = null
        toast.success("Profile Updated Successfully")
        state.user = action.payload.data.user;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.error.message
        toast.error("rejected")
      })
      .addCase(changePassword.fulfilled, (state, action)=>{
        state.loading = 'idle'
        state.error = null;
        toast.success('Password Changed Successfully')
      })
      .addCase(changePassword.rejected, (state, action)=>{
        state.loading = 'idle'
        toast.error("Kindly write correct Old password")
        state.error = action.error.message;
      })
      .addCase(deleteAccount.fulfilled, (state, action)=>{
        state.loading = 'idle'
        state.error = null;
        localStorage.removeItem("token");
        state.token = null
        state.isLoggedIn = false
        toast.success('Account Deleted Successfully')
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
      .addCase(deleteAccount.rejected, (state, action)=>{
        state.loading = 'idle'
        toast.error("Can't delete Accouont")
        state.error = action.error.message;
      })
      .addCase(getNumbers.fulfilled, (state, action)=>{
        state.loading = 'idle'
        state.error = null
        state.wNo = action.payload.numbers.whatsappNumber
        state.mNo = action.payload.numbers.mobileNumber
      })
      .addCase(getNumbers.rejected, (state, action)=>{
        state.loading = 'idle',
        state.error = action.error.message
      })
      .addCase(changeNumbers.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
        toast.success('Number Changed')
        state.wNo = action.payload.numbers.whatsappNumber
        state.mNo = action.payload.numbers.mobileNumber
      })
      .addCase(changeNumbers.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        toast.error("Not changed")
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
        state.allUsers = action.payload.allUsers
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        toast.error("Failed to fetch Data")
      })
      .addCase(deleteSpecificUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
        toast.success(action.payload.message)
      })
      .addCase(deleteSpecificUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        toast.error("Failed to delete")
      })
      .addCase(addRemoveAdmin.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
        toast.success(action.payload.message)
      })
      .addCase(addRemoveAdmin.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
        toast.error("Status no updated")
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = 'pending'
          state.error = null
        }
      )
  },
});

export const userLoggedIn = (state)=> state.user;

export default authSlice.reducer;
