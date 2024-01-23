import {React, AccountBoxIcon, EditIcon, IconButton, CloseIcon, Button} from "../../../assets/MaterialUiImports.js";
import { useEffect } from "react";
import { DisplayProfile } from "../../../assets/DialogueAsset";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, userDetails} from "../../../features/auth/authSlice.js";
import AdminPanel from "../../AdminPanel/MainAdminFile/AdminPanel.jsx";
import "./Profile.css";

const Profile = ({ openProfile, setOpenProfile }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(userLoggedIn);
  const [openPanel, setOpenPanel] = React.useState(false);

  useEffect(() => {
      dispatch(userDetails())
  },[])
  
  return (
    <>
      <DisplayProfile onClose={() => setOpenProfile(false)} open={openProfile}>
        <IconButton
          onClick={() => setOpenProfile(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="profile">
          <AccountBoxIcon id="profileIcon" />
          <p className="profileH">Name : </p>
          <p className="span">{user.name}</p>
          <p className="profileH">Email : </p>
          <p className="span">{user.email}</p>
          <p className="profileH">Phone No : </p>
          <p className="span">+92 {user.pNumber}</p>
          <Button id="profileBtn" type="submit" variant="contained" onClick={()=> {setOpenPanel(true)}}>
            Edit Profile
            <EditIcon id="profileEditIcon" />
          </Button>
        </div>
        <AdminPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
      </DisplayProfile>
    </>
  );
};

export default Profile;
