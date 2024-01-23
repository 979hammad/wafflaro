import {React, Button } from "../../../assets/MaterialUiImports.js";
import "./DeleteAccount.css";
import ConfirmAction from "../../ConfirmAction/ConfirmAction.jsx";
const DeleteAccount = () => {

  const [openCD, setOpenCD] = React.useState(false);

  return (
    <>
    <div className='deleteAccount'>
     <p>Your Account will not be recovered. Are you sure you want to delete your account ?</p>
     <Button id='deleteAccountBtn' variant="contained" onClick={() => setOpenCD(true)}>
      Delete My Account Permanently" 
     </Button>
    </div>
    <ConfirmAction
        action="Delete My Account"
        openCD={openCD}
        setOpenCD={setOpenCD}
    />
    </>
  )
}

export default DeleteAccount