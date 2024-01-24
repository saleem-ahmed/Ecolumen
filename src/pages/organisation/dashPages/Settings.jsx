import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  // Switch,
  Button,
  Box,
  Avatar,
  Tab,
  Tabs,
  Slider,
  Card,
  CardContent,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useState } from "react";

const Settings = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={6} sx={{ p: 4, mt: 8, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SettingsIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography component="h1" variant="h4" color="success">
            Advanced Settings
          </Typography>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Profile" />
            <Tab label="Preferences" />
            <Tab label="Security" />
          </Tabs>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6">Profile Settings</Typography>
                <Avatar
                  sx={{ width: 56, height: 56, mt: 2, mb: 2 }}
                  src="path_to_profile_image.jpg"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography variant="h6">Customize Appearance</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography id="volume-slider" gutterBottom>
                    Volume
                    <VolumeUpIcon sx={{ ml: 1 }} />
                  </Typography>
                  <Slider aria-labelledby="volume-slider" />
                  <Typography id="brightness-slider" gutterBottom>
                    Brightness
                    <Brightness4Icon sx={{ ml: 1 }} />
                  </Typography>
                  <Slider aria-labelledby="brightness-slider" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ px: 5 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
