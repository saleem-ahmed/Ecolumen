import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Input,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);

    uploadFiles(uploadedFiles);
  };

  const uploadFiles = (uploadedFiles) => {
    uploadedFiles.forEach((file) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "YOUR_UPLOAD_URL");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round((event.loaded * 100) / event.total);
          setProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: progressPercent,
          }));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log("File uploaded successfully");
        } else {
          console.error("Upload failed");
        }
      };

      xhr.onerror = () => {
        console.error("Upload error");
      };

      const formData = new FormData();
      formData.append("file", file);
      xhr.send(formData);
    });
  };

  return (
    <Grid sx={{ height: "85vh" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: "600px",
            bgcolor: "#fff",
            borderRadius: 3,
            p: 5,
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Uploads
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "red", mb: 2 }}
          >
            *Please upload specific files: .shp, .tiff, .pdf
          </Typography>
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: ".shp, .tiff, .pdf", multiple: true }}
            fullWidth
            sx={{
              display: "none",
            }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #444",
                borderRadius: 2,
                padding: 4,
                cursor: "pointer",
                "&:hover": {
                  borderColor: "#1976d2",
                },
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <NoteAddIcon fontSize="large" sx={{ color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "500", color: "#1976d2" }}>
                  Click to upload files
                </Typography>
              </Stack>
            </Box>
          </label>
          <List>
            {files.map((file, index) => (
              <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start", borderBottom: "1px solid #f0f0f0", py: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <ListItemIcon>
                    {file.type === "application/pdf" ? (
                      <PictureAsPdfIcon />
                    ) : (
                      <InsertDriveFileIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{
                      sx: { fontWeight: "500", color: "#3a5a76" },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress[file.name] || 0}
                      sx={{
                        height: "8px",
                        borderRadius: "4px",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: 35 }}>
                    {`${progress[file.name] || 0}%`}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("Files uploaded:", files)}
            disabled={files.length === 0}
            fullWidth
            sx={{
              padding: "10px 0",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "16px",
              backgroundColor: "#3a5a76",
              "&:hover": {
                backgroundColor: "#3a5a76",
              },
            }}
          >
            Upload
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
};

export default Upload;
