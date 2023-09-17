import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Divider,
  CardMedia,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import Summary from "./Summary";
import Recommend from "./Recommend";

// Truncate function
const truncate = (str, n) =>
  str.length > n ? str.substr(0, n - 1) + "..." : str;

const ArticlePage = () => {
  const location = useLocation();
  const {
    title,
    description,
    ImageURL,
    NewsURL,
    author,
    date,
    dat,
    sourc,
    concepts,
  } = location.state || {
    title: "Default Title",
    description: "Default Description",
  };


  const [articleDetails, setArticleDetails] = useState(null);
  const [errorInarticle, seterrorInarticle] = useState(true);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  const timeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval > 1) {
      return `${interval} years ago`;
    }

    interval = Math.floor(diffInSeconds / 2592000);
    if (interval >= 1) {
      return `${interval} months ago`;
    }

    interval = Math.floor(diffInSeconds / 86400);
    if (interval >= 1) {
      return `${interval} days ago`;
    }

    interval = Math.floor(diffInSeconds / 3600);
    if (interval >= 1) {
      return `${interval} hours ago`;
    }

    interval = Math.floor(diffInSeconds / 60);
    if (interval >= 1) {
      return `${interval} minutes ago`;
    }

    return `${Math.floor(diffInSeconds)} seconds ago`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const suffix = ["th", "st", "nd", "rd"];
    const v = day % 100;
    const daySuffix = suffix[(v - 20) % 10] || suffix[v] || suffix[0];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${day}${daySuffix} ${monthNames[month]} ${year}`;
  };

  useEffect(() => {
    if (NewsURL) {
      fetch(
        `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/get_article_data/?url=${encodeURIComponent(
          NewsURL
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Do something with the data
          setArticleDetails(data);
          console.log("Article Page", articleDetails);
        })
        .catch((error) => {
          console.error("Error:", error);
          seterrorInarticle(false);
        });
    }
  }, [NewsURL]);

  console.log(author);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Card
          style={{
            borderRadius: "16px",
            boxShadow: "0px 8px 16px 0px rgba(255,255,255,0.1)",
            margin: "2rem 0",
            borderColor: "#aaa",
            border: "1px solid",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={ImageURL}
            alt={title}
            style={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          />
          <CardContent
            style={{
              backgroundColor: theme.palette.background.paper,
              padding: "1.5rem",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontFamily: '"Merriweather", serif',
                fontWeight: 700,
                marginBottom: "0.8rem",
              }}
              gutterBottom
            >
              {title}
            </Typography>
            <Divider style={{ margin: "1rem 0", backgroundColor: "#aaa" }} />
            <Typography variant="body2" paragraph style={{ color: "#a0a0a0" }}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
              <strong>Author(s): </strong>
              {sourc.title}
            </Typography>
            <Typography variant="body2" paragraph style={{ color: "#a0a0a0" }}>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: "10px" }}
              />
              <strong>Published: </strong>
              {formatDate(date)} ({timeAgo(date)})
            </Typography>

            {/* Summary */}
            {description ? (
              <Summary articleText={truncate(description, 2500)} />
            ) : null}
            <Divider style={{ margin: "1rem 0", backgroundColor: "#aaa" }} />
            <Typography variant="body1" paragraph>
              <div
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\n/g, "<br />"), // Replace \n with <br />
                }}
              ></div>
            </Typography>

            <br />
            {/* Recommend */}
            {description ? (
              <Recommend
                articleText={truncate(description, 1000)}
                concepts={concepts}
              />
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default ArticlePage;

