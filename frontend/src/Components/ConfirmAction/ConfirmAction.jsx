import {
  React,
  Button,
  PriorityHighIcon,
} from "../../assets/MaterialUiImports.js";
import { DisplaySPcall } from "../../assets/DialogueAsset.js";
import "./ConfirmAction.css";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteProduct, loading } from "../../features/product/productSlice.js";
import { addRemoveAdmin, deleteAccount, deleteSpecificUser, getAllUsers, userLoggedIn } from "../../features/auth/authSlice.js";

const ConfirmDelete = ({ action, openCD, setOpenCD, id }) => {
  
  const dispatch = useDispatch();
  const productLoading = useSelector((state) => loading(state.product));
  const authState = useSelector(userLoggedIn);
  const userLoading = authState ? authState.loading : "idle";

  const isLoading = productLoading === "pending" || userLoading === "pending";

  const ConfirmTask = (action) => {

    if (action === "Delete Item") {
      dispatch(deleteProduct(id));
    }else if(action === "Delete User") {
      dispatch(deleteSpecificUser(id));
    }else if(action === "Change Status"){
      dispatch(addRemoveAdmin(id))
    }else if(action === "Delete My Account"){
      dispatch(deleteAccount())
    }

    setTimeout(() => {
      dispatch(getAllUsers())
    }, 1000)
  };

  return (
    <>
      <DisplaySPcall open={openCD} onClose={() => setOpenCD(false)}>
        <div className="confirmDelete">
          <PriorityHighIcon id="alertCD" />
          <Button
            id="btnCD"
            variant="contained"
            onClick={() => ConfirmTask(action)}
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              action
            )}
          </Button>
        </div>
      </DisplaySPcall>
    </>
  );
};

export default ConfirmDelete;

