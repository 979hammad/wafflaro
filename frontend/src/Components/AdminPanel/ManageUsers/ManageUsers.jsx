import React, { useEffect } from "react";
import "./ManageUsers.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, userLoggedIn } from "../../../features/auth/authSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import ConfirmAction from "../../ConfirmAction/ConfirmAction";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { allUsers } = useSelector(userLoggedIn);
  const [openCD, setOpenCD] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [id, setId] = React.useState(null);

  
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <div className="manageUsers">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone #</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers ? (
              <>
                {allUsers.map((currVal, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{currVal.name}</td>
                    <td>+92 {currVal.pNumber}</td>
                    <td>{currVal.email}</td>
                    <td onClick={()=>{setId(currVal._id); setAction("Change Status"); setOpenCD(true)}}>
                      {
                       (currVal.role === "admin") ? <Button variant="outlined" size="small" color="error">Admin</Button> :  <Button variant="outlined" size="small" color="success">User</Button>
                      }
                    </td>
                    <td onClick={()=>{setId(currVal._id); setAction("Delete User"); setOpenCD(true)}}><DeleteIcon id="deleteUserIco" /></td>
                  </tr>
                ))}
              </>
            ) : (
              <>Loading ...</>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmAction
        action={action}
        openCD={openCD}
        setOpenCD={setOpenCD}
        id={id}
      />
    </>
  );
};

export default ManageUsers;
