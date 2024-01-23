import {
  React,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  CloseIcon,
  Slide,
  DeleteIcon,
  EditIcon,
} from "../../../assets/MaterialUiImports.js";
// import AdminPanel from '../../AdminPanel/MainAdminFile/AdminPanel';
import ConfirmAction from "../../ConfirmAction/ConfirmAction.jsx";
import EditSinglePage from "./EditSinglePage/EditSinglePage.jsx";
import SPcall from "./SPcall/SPcall.jsx";
import "./SinglePage.css";
import { userLoggedIn } from "../../../features/auth/authSlice.js";
import { useSelector } from "react-redux";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SinglePage = ({ setOpenSinglePage, openSinglePage, singleData }) => {
  const [openSPcall, setOpenSPcall] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openCD, setOpenCD] = React.useState(false);
  const { role } = useSelector(userLoggedIn);
  return (
    <>
      <Dialog
        fullScreen
        open={openSinglePage}
        onClose={() => setOpenSinglePage(false)}
        TransitionComponent={Transition}
      >
        <AppBar id="SPtoolbar" sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              id="SPclose"
              edge="end"
              onClick={() => setOpenSinglePage(false)}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="SPheading">Wafflaro Special</h2>
          </Toolbar>
        </AppBar>
        <div className="SinglePageBody">
          <img src={singleData.itemImage.path} alt="" />
          <div className="SPbodyRt">
            <p className="SPbodyRtH">
              Name : <span>{singleData.itemName}</span>
            </p>
            <p className="SPbodyRtH">Price : {singleData.price}</p>
            <p className="SPbodyRtH">Detail : </p>
            <p className="SPbodyRTBody">{singleData.description}</p>
            <Button
              id="SPbodyRtBtnCall"
              variant="contained"
              onClick={() => setOpenSPcall(true)}
            >
              Just One Click Away
            </Button>
            {role === "admin" ? (
              <>
                <Button
                  id="SPbodyRtBtnEdit"
                  variant="contained"
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  <EditIcon id="SPbodyRtBtnEditIco" />
                </Button>
                <Button
                  id="SPbodyRtBtnEdit"
                  variant="contained"
                  onClick={() => setOpenCD(true)}
                >
                  <DeleteIcon id="SPbodyRtBtnEditIco" />
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Dialog>
      <SPcall setOpenSPcall={setOpenSPcall} openSPcall={openSPcall} />
      <EditSinglePage
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        singleData={singleData}
      />
      {/* <AdminPanel openPanel={openPanel} setOpenPanel={setOpenPanel}/> */}
      <ConfirmAction
        action="Delete Item"
        openCD={openCD}
        setOpenCD={setOpenCD}
        id={singleData._id}
      />
    </>
  );
};

export default SinglePage;
