import {React, Button, ConnectWithoutContactIcon, WhatsAppIcon, CallIcon} from "../../../../assets/MaterialUiImports.js"
import { DisplaySPcall } from "../../../../assets/DialogueAsset";
import "./SPcall.css";
import { useDispatch, useSelector } from "react-redux";
import { getNumbers, userLoggedIn } from "../../../../features/auth/authSlice.js";
import { useEffect } from "react";

const SPcall = ({openSPcall, setOpenSPcall}) => {
  const dispatch = useDispatch();
  const {wNo, mNo} = useSelector(userLoggedIn);
  useEffect(()=>{
   dispatch(getNumbers)
  },[])

  return(
    <>
      <DisplaySPcall 
        open={openSPcall}
        onClose={()=> setOpenSPcall(false)}
      >
      <div className="SPcall">
      <ConnectWithoutContactIcon id="SPcallContact"/>
      <Button id="SPcallBtnWM" variant="contained" onClick={()=>window.open(`https://wa.me/+92${wNo}`, '_blank')}><WhatsAppIcon id="SPcallBtnWMicon"/>Whatsapp Message</Button>
      <Button id="SPcallBtnPC" variant="contained" onClick={()=>window.open(`tel:+92${mNo}`)} ><CallIcon id="SPcallBtnPCicon" />Make a Phone Call</Button>
      </div>
      </DisplaySPcall>
    </>
  )
};

export default SPcall;
