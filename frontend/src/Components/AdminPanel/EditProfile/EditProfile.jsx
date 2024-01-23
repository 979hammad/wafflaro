import {React, Button} from "../../../assets/MaterialUiImports.js";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import {editProfile, userLoggedIn } from "../../../features/auth/authSlice.js";
import "./EditProfile.css";

const EditProfile = () => {
  const {user, loading} = useSelector(userLoggedIn);
  const prevData = {
    name : user.name,
    email : user.email,
    pNumber : user.pNumber
  }
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(prevData);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isFormValid = Object.values(formData).every((value) => {
      const stringValue = String(value);
      return stringValue.trim() !== "";
    });
  
    if (isFormValid) {
      dispatch(editProfile(formData))
    } else {
      toast.error("Kindly fill all the fields")
    }
  };

  return (
    <>
      <div className="editProfile">
        <h3>Update Personal Information</h3>
        <hr />
        <div className="personalInfoBody">
          <p>Name</p>
          <input
            className="input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />
          <p>Email</p>
          <input
            className="input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <p>Phone Number</p>
          <input
            className="input"
            name="pNumber"
            value={formData.pNumber}
            onChange={handleChange}
            autoComplete="off"
          />
          <Button id="personalInfoBtn" variant="contained" onClick={handleSubmit}>
          {loading === "idle" ? "Update" : <CircularProgress size={20} style={{color:"white"}}/>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
