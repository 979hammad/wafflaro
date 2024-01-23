import { React, Input, InputLabel, FormHelperText, Button, AddCircleIcon } from "../../../../assets/MaterialUiImports.js";
import { EditSinglePage } from "../../../../assets/DialogueAsset.js";
import useEditItemForm from "./useEditForm.js";
import { useDispatch, useSelector } from "react-redux";
import { updateitem, loading } from "../../../../features/product/productSlice.js";
import "../../../AdminPanel/AddItem/AddItem.css";
import CircularProgress from '@mui/material/CircularProgress';
import "./EditSinglePage.css";

const EditItem = ({ openEdit, setOpenEdit, singleData }) => {
  const { prevData, validation, selectedFile, previewUrl, handleImageUpload, handleIconClick, handleEdited } = useEditItemForm(singleData);
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=> loading(state.product));

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !prevData.category ||
      !prevData.itemName ||
      !prevData.description ||
      !prevData.price ||
      prevData.price < 0
    ) {
      alert("Please fill in all the fields correctly.");
      return;
    }
    const formData = new FormData();

    if (selectedFile) {
      formData.append("itemPic", selectedFile);
    }

    formData.append("itemName", prevData.itemName);
    formData.append("price", prevData.price);
    formData.append("description", prevData.description);
    formData.append("category", prevData.category);
    
    dispatch(updateitem({ id: singleData._id, data: formData }));
  };
  
  return (
    <>
      <EditSinglePage open={openEdit}  onClose={() => setOpenEdit(false)}>
        <form className="editSinglePage"  onSubmit={submitForm}>
          <input
            type="file"
            name="changedItemPic"
            id="fileInput"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div className="addItemImgCircleBG">
            {previewUrl ? (
              <img 
                src={previewUrl}
                alt="Selected"
                id="addItemImgEditSingle"
                onClick={handleIconClick}
              />
            ) : (
              <AddCircleIcon id="addItemImgCircle" onClick={handleIconClick} />
            )}
          </div>
          <div className="addItemRt">
            <InputLabel htmlFor="itemCategory" id="itemCategory">Edit category</InputLabel>
            <Input
              id="itemCategory"
              autoComplete="off"
              name="category"
              value={prevData.category}
              onChange={handleEdited}
              error={validation.category}
            />
            {validation.category ? (
              <FormHelperText id="categoryFormInputs">required</FormHelperText>
            ) : null}
            <InputLabel htmlFor="itemName" id="itemName">Edit Name</InputLabel>
            <Input
              id="itemName"
              autoComplete="off"
              name="itemName"
              value={prevData.itemName}
              onChange={handleEdited}
              error={validation.itemName}
            />
            {validation.itemName ? (
              <FormHelperText id="categoryFormInputs">required</FormHelperText>
            ) : null}
            <InputLabel htmlFor="price" id="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              autoComplete="off"
              name="price"
              value={prevData.price}
              inputProps={{
                min: "0",
              }}
              onChange={handleEdited}
              error={validation.price}
            />
            {validation.price ? (
              <FormHelperText id="categoryFormInputs">required</FormHelperText>
            ) : null}
            <InputLabel htmlFor="description" id="description">Detail</InputLabel>
            <Input
              id="description"
              multiline
              rows={3}
              autoComplete="off"
              name="description"
              value={prevData.description}
              error={validation.description}
              onChange={handleEdited}
            />
            {validation.description ? (
              <FormHelperText id="categoryFormInputs">required</FormHelperText>
            ) : null}
            <div className="btnDiv">
            <Button id="itemBtn" type="submit" variant="contained">
            {isLoading === "idle" ? "Save" : <CircularProgress size={20} style={{color:"white"}}/>}
            </Button>
            <Button
              id="itemBtn"
              variant="contained"
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>
            </div>
          </div>
        </form>
      </EditSinglePage>
    </>
  );
};

export default EditItem;
