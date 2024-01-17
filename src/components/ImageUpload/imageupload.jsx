import { useState, useEffect } from 'react';
import { Avatar, Button, Stack } from '@mui/material';

const UploadImage = ({ imageProp, onImageChange }) => {
  const [image, setImage] = useState(imageProp);

  useEffect(() => {
    setImage(imageProp);
  }, [imageProp]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const newImageUrl = URL.createObjectURL(img);
      setImage(newImageUrl); // Set the image in the local state of this component
      onImageChange(newImageUrl); // Call the callback function passed from the parent component
    }
  };

  return (
    <Stack alignItems="center" spacing={2}>
      <Avatar
        alt="Uploaded image"
        src={image}
        sx={{ width: 90, height: 90, borderRadius: '50%' }}
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button color="success" variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </Stack>
  );
};

export default UploadImage;
