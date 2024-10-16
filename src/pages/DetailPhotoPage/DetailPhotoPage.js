import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { fetchPhotoInfo } from "../../services/photoService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DetailPhoto() {
  const [photoInfo, setPhotoInfo] = useState(null);
  const { id } = useParams();
  const getPhotoInfo = async () => {
    try {
      const response = await fetchPhotoInfo(id);
      // console.log(response);
      setPhotoInfo(response.data);
      if (response && response.status === 200) {
        console.log(response);
        toast.success("Fetch photo info successfully");
        return response.data;
      }
    } catch (error) {
      navigate("/");
      toast.error("Error when fetching photo with id: " + id);
      console.error("Error fetching photo info:", error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    getPhotoInfo();
  }, [id]);

  useEffect(() => {
    console.log(photoInfo);
  }, [photoInfo]);

  return (
    <Grid container spacing={2} sx={{ mt: 10 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <CardMedia
            component="img"
            image={photoInfo?.urls?.full}
            alt="Photo Image"
          />
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {photoInfo?.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {photoInfo?.alt_description}
            </Typography>
            <Grid
              container
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 2, justifyContent: "center" }}
            >
              <Grid>
                <Avatar
                  alt={photoInfo?.user?.name}
                  src={photoInfo?.user?.profile_image?.small}
                />
              </Grid>
              <Grid>
                <Typography variant="body1">
                  {photoInfo?.user?.name +
                    " (" +
                    photoInfo?.user?.username +
                    ")"}
                </Typography>
              </Grid>
            </Grid>
            {photoInfo?.location.name && (
              <Typography variant="body2" color="text.secondary">
                Location: {photoInfo?.location?.name}
              </Typography>
            )}
          </CardContent>
          <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
            <IconButton aria-label="add to favorites" size="small">
              <FavoriteIcon fontSize="small" /> {photoInfo?.likes}
            </IconButton>
            <IconButton aria-label="download" size="small">
              <DownloadIcon fontSize="small" />
              {photoInfo?.downloads}
            </IconButton>
          </Grid>
        </Card>
        <Button variant="outlined" sx={{ mt: 4 }} href="/">
          <KeyboardReturnIcon /> BACK TO PHOTO GALLERY
        </Button>
      </Grid>
    </Grid>
  );
}
