import { useState, useEffect } from 'react';

const useEditItemForm = (singleData) => {
  const [prevData, setChangedData] = useState({
    itemName: singleData.itemName,
    price: singleData.price,
    description: singleData.description,
    category: singleData.category,
  });

  const [validation, setValidation] = useState({
    itemName: false,
    price: false,
    description: false,
    category: false,
  });

  const [selectedFile, setSeletedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(singleData.itemImage.path);

  const handleImageUpload = (e) => {
    setSeletedFile(e.target.files[0]);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleEdited = (e) => {
    setChangedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    setValidation((prev) => ({
      ...prev,
      [name]: !value,
    }));
  };

  useEffect(() => {
    setChangedData({
      itemName: singleData.itemName,
      price: singleData.price,
      description: singleData.description,
      category: singleData.category,
    });

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(singleData.itemImage.path);
    }
  }, [selectedFile, singleData]);

  return {
    prevData,
    validation,
    selectedFile,
    previewUrl,
    handleImageUpload,
    handleIconClick,
    handleEdited,
  };
};

export default useEditItemForm;
