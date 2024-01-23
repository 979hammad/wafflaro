import { React, Button } from "../../../assets/MaterialUiImports.js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../EditProfile/EditProfile.css";
import { changeNumbers, userLoggedIn } from "../../../features/auth/authSlice.js";
import CircularProgress from '@mui/material/CircularProgress';

const ChangeNumbers = () => {
  const {wNo, mNo, loading} = useSelector(userLoggedIn)
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState({
    whatsappNumber: wNo,
    mobileNumber: mNo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumbers((prevNumbers) => ({
      ...prevNumbers,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (Object.values(numbers).some((value) => String(value).trim() === "")) {
      console.error("Please fill in all fields");
      return;
    }
    dispatch(changeNumbers(numbers))
  };

  return (
    <>
      <div className="editPassword">
        <h3>Change Numbers</h3>
        <hr />
        <div className="personalInfoBody">
          <p>Change Whatsapp Number</p>
          <input
            className="input"
            type="number"
            name="whatsappNumber"
            value={numbers.whatsappNumber}
            onChange={handleChange}
          />
          <p>Change Mobile Number</p>
          <input
            className="input"
            type="number"
            name="mobileNumber"
            value={numbers.mobileNumber}
            onChange={handleChange}

          />
          <Button id="personalInfoBtn" variant="contained" onClick={handleSaveChanges}>
          {loading === "idle" ? "update" : <CircularProgress style={{color:"white" }} size={20}  />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangeNumbers;
