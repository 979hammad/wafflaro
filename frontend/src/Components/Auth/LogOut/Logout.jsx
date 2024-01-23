import { React , LogoutIcon, Button } from "../../../assets/MaterialUiImports.js"
import { DisplayLogout } from "../../../assets/DialogueAsset";
import { logoutUser, userLoggedIn } from "../../../features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import "./Logout.css";
import { CircularProgress } from "@mui/material";

const Logout = ({openLogout ,setOpenLogout}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(userLoggedIn);
  return (
    <>
      <DisplayLogout
        onClose={()=> setOpenLogout(false)}
        open={openLogout}
      >
      <div className="logout">
        <LogoutIcon id="logoutIcon" />
        <p>Are you sure you want to Logout</p>
        <Button id="logoutBtn" onClick={()=> dispatch(logoutUser())} variant="contained">
          {loading === "idle" ? "Logout" : <CircularProgress size={20} style={{color:"white"}}/>}
        </Button>
      </div>
      </DisplayLogout>
    </>
  );
};

export default Logout;
