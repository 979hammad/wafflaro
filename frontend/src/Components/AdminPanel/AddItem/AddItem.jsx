import {React, Input, InputLabel, FormHelperText, Button, useForm, AddCircleIcon} from "../../../assets/MaterialUiImports.js";
import "./AddItem.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { addItem, loading } from "../../../features/product/productSlice.js";
const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSeletedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const dispatch = useDispatch();
  const isLoading = useSelector((state)=> loading(state.product))

  const handleImageUpload = (e) => {
    setSeletedFile(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };
  
  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append('itemPic', selectedFile);
    formData.append('category', data.category);
    formData.append('itemName', data.itemName);
    formData.append('price', data.price);
    formData.append('description', data.description);

    dispatch(addItem(formData));
    
  };
  return (
    <>
      <form className="addItem" onSubmit={handleSubmit(submitForm)}>
        <input
          type="file"
          name="itemPic"
          id="fileInput"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <div className="addItemImgCircleBG">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected"
            id="addItemImg"
            onClick={handleIconClick}
          />
        ) : (
          <AddCircleIcon id="addItemImgCircle" onClick={handleIconClick} />
          
        )}
        </div>
        <div className="addItemRt">
          <InputLabel htmlFor="itemCategory" id="itemCategory">Enter Item Category</InputLabel>
          <Input
            id="itemCategory"
            autoComplete="off"
            {...register("category", {
              required: "Required field",
            })}
            error={!!errors?.category}
          />
          <FormHelperText id="categoryFormInputs">
            {errors?.category?.message}
          </FormHelperText>
          <InputLabel htmlFor="itemName" id="itemName">Enter Name Of New Item</InputLabel>
          <Input
            id="itemName"
            autoComplete="off"
            {...register("itemName", {
              required: "Required field",
            })}
            error={!!errors?.itemName}
          />
          <FormHelperText id="categoryFormInputs">
            {errors?.itemName?.message}
          </FormHelperText>
          <InputLabel htmlFor="price" id="price">Price</InputLabel>
          <Input
            id="price"
            type="number"
            autoComplete="off"
            {...register("price", {
              required: "Required field",
              validate: {
                positiveNumber: (value) => {
                  return (
                    parseFloat(value) > 0 || "Price should be greater than 1PKR"
                  );
                },
              },
            })}
            error={!!errors?.price}
          />
          <FormHelperText id="categoryFormInputs">
            {errors?.price?.message}
          </FormHelperText>
          <InputLabel htmlFor="description" price="description">Detail</InputLabel>
          <Input
            id="description"
            multiline
            rows={3}
            autoComplete="off"
            {...register("description", {
              required: "Required field",
            })}
            error={!!errors?.description}
          />
          <FormHelperText id="categoryFormInputs">
            {errors?.description?.message}
          </FormHelperText>
          <Button id="itemBtn" type="submit" variant="contained">
          {isLoading === "idle" ? "Add New Item" : <CircularProgress size={20} style={{color:"white"}}/>}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddItem;
