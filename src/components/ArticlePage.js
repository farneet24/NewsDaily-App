import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Summary from "./Summary";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Roboto Slab");
  const [bgColor, setBgColor] = useState("bg-white");
  const [textColor, setTextColor] = useState("text-gray-900");
  const navigate = useNavigate();

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const changeFontFamily = (family) => {
    setFontFamily(family);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const fonts = [
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Calibri",
    "Cambria",
    "Candara",
    "Century Gothic",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier",
    "Cursive",
    "Fantasy",
    "Franklin Gothic Medium",
    "Garamond",
    "Georgia",
    "Helvetica",
    "Impact",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Monospace",
    "MS Sans Serif",
    "Playfair Display",
    "Palatino Linotype",
    "Roboto Slab",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
  ];

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      setBgColor("bg-gray-900");
      setTextColor("text-white");
    } else {
      setBgColor("bg-white");
      setTextColor("text-gray-900");
    }
  }, [darkMode]);

  useEffect(() => {
    if (NewsURL) {
      fetch(
        `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/get_article_data/?url=${encodeURIComponent(
          NewsURL
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
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
    <>
      <div className={`container mx-auto p-4 ${bgColor}`}>
        <div className="absolute top-4 left-4 z-50 my-2">
          <button
            className="rounded-full p-3 focus:outline-none transition duration-300 ease-in-out shadow-lg"
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </button>
        </div>

        <img
          className="w-100 img-fluid mb-3"
          src={ImageURL}
          alt="We are sorry for this"
          style={{ objectFit: "cover", height: "150px" }}
        />
        <div class="bg-white rounded-lg p-4">
          <header class="relative mb-6">
            <div class="eleven">
              <h1 id="newsh">{title}</h1>
              <span className="text-gray-500 text-sm newsart">
                <FontAwesomeIcon icon={faUser} />
                <strong> Author:</strong> {sourc.title}
              </span>
              <span className="text-gray-500 text-sm newsart">
                <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                <strong>Published On: </strong>
                {formatDate(date)} ({timeAgo(date)})
              </span>
            </div>
          </header>
        </div>

        {description ? (
          <Summary articleText={truncate(description, 2500)} />
        ) : null}
        <Divider style={{ margin: "1rem 0", backgroundColor: "#aaa" }} />

        <div class="bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <div class="flex flex-wrap gap-4 mb-6">
            <select
              id="font-size"
              onChange={(e) => changeFontSize(e.target.value)}
              class="bg-gray-300 text-gray-800 py-2 px-4 rounded my-2 me-2"
            >
              <option value="16">Default Font Size</option>
              <option value="18">Large Font Size</option>
              <option value="20">XL Font Size</option>
              <option value="22">XXL Font Size</option>
            </select>

            <select
              id="font-family"
              onChange={(e) => changeFontFamily(e.target.value)}
              class="bg-gray-300 text-gray-800 py-2 px-4 rounded my-2 me-2"
            >
              {fonts.map((font, index) => (
                <option key={index} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div
            id="article-content"
            className={`prose prose-lg ${textColor} ${bgColor} leading-relaxed my-4`}
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n/g, "<br />"), // Replace \n with <br />
              }}
            ></div>
          </div>
        </div>
        {description ? (
          <Recommend
            articleText={truncate(description, 1000)}
            concepts={concepts}
          />
        ) : null}
      </div>
    </>
  );
};

export default ArticlePage;
