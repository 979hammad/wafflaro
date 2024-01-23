import {
  React,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
  Button,
  InputAdornment,
  TextField,
  SearchIcon,
  AccountCircleIcon,
  Tabs,
  Tab,
} from "../../../assets/MaterialUiImports.js";
import Login from "../../Auth/LogIn/Login";
import Logout from "../../Auth/LogOut/Logout";
import SignUp from "../../Auth/SignUp/SignUp";
import Profile from "../Profile/Profile";
import AdminPanel from "../../AdminPanel/MainAdminFile/AdminPanel";
import SPcall from "../../Home/SinglePage/SPcall/SPcall.jsx";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../../../features/auth/authSlice.js";
import { getAllProducts, productData } from "../../../features/product/productSlice.js";
// const categories = ["Wafflaro", "iceCream"];

const NavBar = () => {
  const [openLogin, setOpen] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [openPanel, setOpenPanel] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isActiveScroll, setIsActive] = React.useState(null);
  const [openSPcall, setOpenSPcall] = React.useState(false);
  const [searchItem, setSearchItem] = React.useState("");

  const { role, isLoggedIn } = useSelector(userLoggedIn);
  const items = useSelector((state)=> productData(state.product));
  const category = Object.keys(items);

  const dispatch = useDispatch();

  const handleMenuClose = () => {
    setAnchorElUser(null);
  };
  
  React.useEffect(()=>{
    dispatch(getAllProducts(searchItem))
  },[searchItem])
  return (
    <>
      <nav>
        <div className="nav">
          <img id="logo" src="/wafflaroLogo.png" alt="Logo" />
          <TextField
            id="search"
            onChange={(event)=> setSearchItem(event.target.value)}
            placeholder="Search Item here ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon id="NavSeachIcon" />
                </InputAdornment>
              ),
            }}
          />
          <div className="navRightSide">
            <Button id="fade-button" onClick={() => setOpenSPcall(true)}>
              Contact US
            </Button>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip>
                <IconButton
                  onClick={(event) => setAnchorElUser(event.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <AccountCircleIcon id="accountIcon" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleMenuClose}
              >
                {isLoggedIn === true ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setOpenProfile(true);
                      }}
                    >
                     Show Profile
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setOpenPanel(true);
                      }}
                    >
                     {role === 'user' ? "Update Profile" : "Admin Panel"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setOpenLogout(true);
                      }}
                    >
                      LogOut
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setOpen(true);
                      }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        setOpenSignUp(true);
                      }}
                    >
                      SignUp
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </div>
        </div>
        <div className="scrollableNav">
          <Box>
            <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile>
              {category.map((currentVal) => {
                const idWithoutSpaces = currentVal.replace(/\s+/g, '').toLowerCase();
                return (
                  <Tab
                    key={currentVal}
                    id="tab"
                    label={
                      <a
                        className={`nav2Tabs ${
                          isActiveScroll === currentVal ? "isActiveScroll" : ""
                        }`}
                        href={`#${idWithoutSpaces}`}
                        onClick={() => setIsActive(currentVal)}
                      >
                        {currentVal}
                      </a>
                    }
                  />
                );
              })}
            </Tabs>
          </Box>
        </div>
      </nav>
      <Login openLogin={openLogin} setOpen={setOpen} />
      <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
      <SignUp openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
      <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
      <AdminPanel openPanel={openPanel} setOpenPanel={setOpenPanel} />
      <SPcall setOpenSPcall={setOpenSPcall} openSPcall={openSPcall} />
    </>
  );
};

export default NavBar;
