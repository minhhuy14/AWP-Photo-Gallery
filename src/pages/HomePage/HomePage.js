import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { fetchPhotoList } from "../../services/photoService";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@mui/material/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ListPhotos() {
  const [listPhotos, setListPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(12);
  const [hasMore, setHasMore] = useState(true);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  const getPhotoList = async (page, perPage) => {
    let response = await fetchPhotoList(page, perPage);
    if (response && response.status === 200) {
      console.log(response);
      return response.data;
    }
    return [];
  };

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      const result = await getPhotoList(currentPage, itemsPerPage);
      if (result) {
        setListPhotos(result);
      }
    };

    fetchInitialPhotos();
  }, []);

  const getMorePhotos = async () => {
    const nextPage = currentPage + 1;
    let newPhotos = await getPhotoList(nextPage, itemsPerPage);
    if (newPhotos.length > 0) {
      setListPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setCurrentPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    if (isLg) return 4;

    return 4;
  };

  return (
    <Grid
      container
      spacing={2}
      className="list-photo"
      sx={{
        overflow: "hidden",
        height: "80vh",
      }}
    >
      <InfiniteScroll
        dataLength={listPhotos.length}
        next={getMorePhotos}
        hasMore={hasMore}
        loader={<CircularProgress size="3rem" />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height="80vh"
      >
        <ImageList cols={getCols()}>
          {listPhotos.map((item) => (
            <a key={item.id} href={`photo/${item.id}`}>
              <ImageListItem key={item.id} href="photo/:id">
                <img
                  srcSet={`${item.urls.thumb}`}
                  src={`${item.urls.thumb}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: "25vh", width: "25vh" }}
                />
                <ImageListItemBar
                  title={item.user.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.user.name}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </a>
          ))}
        </ImageList>
      </InfiniteScroll>
    </Grid>
  );
}
