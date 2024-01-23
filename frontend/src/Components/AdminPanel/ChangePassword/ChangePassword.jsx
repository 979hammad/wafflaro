import {React, Button} from "../../../assets/MaterialUiImports.js";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { changePassword, userLoggedIn } from "../../../features/auth/authSlice.js";
import {toast} from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import "../EditProfile/EditProfile.css";

const EditProfile = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    cNewPassword: "",
  });
  const dispatch = useDispatch();
  const {loading} = useSelector(userLoggedIn);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (passwords.newPassword !== passwords.cNewPassword) {
      toast.error("Password and Confirm Password don't match")
      return;
    }else{
      dispatch(changePassword(passwords))
      setPasswords({
        oldPassword: "",
        newPassword: "",
        cNewPassword: "",
      })
    }
  };

  return (
    <>
      <div className="editPassword">
        <h3>Change Password</h3>
        <hr />
        <div className="personalInfoBody">
          <p>Enter Old Password</p>
          <input
            className="input"
            type="password"
            name="oldPassword"
            placeholder="Enter Old Password here..."
            value={passwords.oldPassword}
            onChange={handleChange}
          />
          <p>Enter New Password</p>
          <input
            className="input"
            type="password"
            name="newPassword"
            placeholder="Enter New Password here ..."
            value={passwords.newPassword}
            onChange={handleChange}
          />
          <p>Enter Confirm New Password</p>
          <input
            className="input"
            type="password"
            name="cNewPassword"
            placeholder="Enter Confirm New Password here ..."
            value={passwords.cNewPassword}
            onChange={handleChange}
          />
          <Button id="personalInfoBtn" variant="contained" onClick={handleSaveChanges}>
          {loading === "idle" ? "Update" : <CircularProgress size={20} style={{color:"white"}}/>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
