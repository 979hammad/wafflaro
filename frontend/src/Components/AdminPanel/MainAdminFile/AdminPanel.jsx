import * as React from 'react';
import {Box, Tabs, Tab} from "../../../assets/MaterialUiImports";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddItem from "../AddItem/AddItem";
import ManageUsers from '../ManageUsers/ManageUsers';
import "./AdminPanel.css";
import EditProfile from '../EditProfile/EditProfile';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import ChangePassword from "../ChangePassword/ChangePassword";
import AddHeaderImg from '../AddHeaderImg/AddHeaderImg';
import ChangeNumbers from '../ChangeNumbers/ChangeNumbers';
import {  useDispatch, useSelector } from 'react-redux';
import { getNumbers, userLoggedIn } from '../../../features/auth/authSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AdminPanel = ({openPanel, setOpenPanel}) => {
  const [isActive, setIsActive] = React.useState("editProfile");
  const [isActiveScroll, setIsActiveScroll] = React.useState(null);
  const dispatch = useDispatch()
  const {role} = useSelector(userLoggedIn);

  React.useEffect(()=>{
    dispatch(getNumbers())
  },[])
  
  return (
    <>
      <Dialog
        fullScreen
        open={openPanel}
        onClose={()=>setOpenPanel(false)}
        TransitionComponent={Transition}
      >
        <AppBar id="adminToolbar" sx={{ position: 'relative' }}>
          <Toolbar >
            <IconButton
              id='adminClose'
              edge="end"
              onClick={()=>setOpenPanel(false)}
            >
              <CloseIcon />
            </IconButton>
            <h2 className='adminHeading'>
             {role === 'admin' ? 'Admin Panel' : 'Update Profile'}
            </h2>
          </Toolbar>
        </AppBar>
        <div className="scrollableNavAdmin">
          <Box >
            <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile>
              {role === "admin" ? 
              (<>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "manageUsers" ? "isActiveA" : ""} onClick={()=>setIsActive("manageUsers")}>Mange Users</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "addHeaderImg" ? "isActiveA" : ""} onClick={()=>setIsActive("addHeaderImg")}>Header Image</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "addNewItem" ? "isActiveA" : ""} onClick={()=>setIsActive("addNewItem")}>Add New Item</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "changeNumbers" ? "isActiveA" : ""} onClick={()=>setIsActive("changeNumbers")}>Change Numbers</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "editProfile" ? "isActiveA" : ""} onClick={()=>setIsActive("editProfile")}>Personal Info</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "changePassword" ? "isActiveA" : ""} onClick={()=>setIsActive("changePassword")}>Change Password</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "deleteAccount" ? "isActiveA" : ""} onClick={()=>setIsActive("deleteAccount")}>Delete My Account</a>}/>  
              </>) : (<>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "editProfile" ? "isActiveA" : ""} onClick={()=>setIsActive("editProfile")}>Personal Info</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "changePassword" ? "isActiveA" : ""} onClick={()=>setIsActive("changePassword")}>Change Password</a>}/>
                  <Tab sx={{ padding: 0 }} label={<a className={isActive === "deleteAccount" ? "isActiveA" : ""} onClick={()=>setIsActive("deleteAccount")}>Delete My Account</a>}/>  
              </>)}
            </Tabs>
          </Box>
        </div>
        <div className='adminPanelBody'>
          
          <div className='adminPanelBodyLT'>
            <h3>DashBoard</h3>
            {
              role === "admin" ? 
              (<>
                <p className={isActive === "editProfile" ? "isActive" : ""} onClick={()=>setIsActive("editProfile")}>Personal Info</p>
            <p className={isActive === "manageUsers" ? "isActive" : ""} onClick={()=>setIsActive("manageUsers")}>Mange Users</p>
            <p className={isActive === "addHeaderImg" ? "isActive" : ""} onClick={()=>setIsActive("addHeaderImg")}>Header Image</p>
            <p className={isActive === "addNewItem" ? "isActive" : ""} onClick={()=>setIsActive("addNewItem")}>Add New Item</p>
            <p className={isActive === "changeNumbers" ? "isActive" : ""} onClick={()=>{setIsActive("changeNumbers"); }}>Change Numbers</p> 
            <p className={isActive === "changePassword" ? "isActive" : ""} onClick={()=>setIsActive("changePassword")}>Change Password</p>
            <p className={isActive === "deleteAccount" ? "isActive" : ""} onClick={()=>setIsActive("deleteAccount")}>Delete My Account</p> 
              </>) : (<>
            <p className={isActive === "editProfile" ? "isActive" : ""} onClick={()=>setIsActive("editProfile")}>Personal Info</p>
            <p className={isActive === "changePassword" ? "isActive" : ""} onClick={()=>setIsActive("changePassword")}>Change Password</p>
            <p className={isActive === "deleteAccount" ? "isActive" : ""} onClick={()=>setIsActive("deleteAccount")}>Delete My Account</p>   
              </>)
            }
          </div>
          <div className='adminPanelBodyRT'>
            { isActive === "editProfile" ? <EditProfile /> : "" }
            { isActive === "changePassword" ? <ChangePassword /> : "" }
            { isActive === "addNewItem" ? <AddItem /> : "" }
            { isActive === "manageUsers" ? <ManageUsers /> : ""}
            { isActive === "deleteAccount" ? <DeleteAccount /> : ""}
            { isActive === "addHeaderImg" ? <AddHeaderImg /> : ""}
            { isActive === "changeNumbers" ? <ChangeNumbers /> : ""}
          </div>
        </div>
       
      </Dialog>
    </>
  );
}

export default AdminPanel