import {React, useState, Button, UploadIcon } from '../../../assets/MaterialUiImports.js';
import "./AddHeaderImg.css";
import { useDispatch} from "react-redux";
import { headerImage } from '../../../features/product/productSlice.js';

const AddHeaderImg = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const dispatch = useDispatch();
  
  const handleFileChange = (event, setterFunction) => {
    const file = event.target.files[0];
    setterFunction(file);
  };

  const handleUpload = (id, file) => {
    const formData = new FormData();
    formData.append('itemPic', file);
    
    dispatch(headerImage({id:id, data: formData}))
  };


  return (
    <>
     <div className='addHeaderImg'>
       <p>Add 1st Header Image</p>
       <hr />
       <input className='uploadHeaderInput' type='file' name="itemPic" onChange={(e)=> handleFileChange(e, setFile1)}/>
       <Button id='headerImgBtn' variant='contained' onClick={() => handleUpload("65af0bbe047d51a1d0df71ac", file1)}>Update <UploadIcon id="headerImgUploadIco"/></Button>
      
       <p>Add 2nd Header Image</p>
       <hr />
       <input className='uploadHeaderInput' type='file' name="itemPic" onChange={(e)=> handleFileChange(e, setFile2)}/>
       <Button id='headerImgBtn' variant='contained' onClick={() => handleUpload("65af0c45f0c0ddcd0f3dafce" ,file2)}>Update <UploadIcon id="headerImgUploadIco"/></Button>

       <p>Add 3rd Header Image</p>
       <hr />
       <input className='uploadHeaderInput' type='file' name="itemPic" onChange={(e)=> handleFileChange(e, setFile3)}/>
       <Button id='headerImgBtn' variant='contained' onClick={() => handleUpload("65af0c4ff0c0ddcd0f3dafd1" ,file3)}>Update <UploadIcon id="headerImgUploadIco"/></Button>
     </div>
    </>
  )
}

export default AddHeaderImg