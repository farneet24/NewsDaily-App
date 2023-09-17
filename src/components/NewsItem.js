import React from "react";
import { useNavigate } from "react-router-dom";

const NewsItem = ({
  title,
  description,
  ImageURL,
  NewsURL,
  author,
  date,
  dat,
}) => {
  const navigate = useNavigate(); // Note the change here

  const handleReadArticle = () => {
    navigate("/article", {
      state: { title, description, ImageURL, NewsURL, author, date },
    }); // Note the change here
  };

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const suffix = getSuffix(day);
    return `${day}${suffix} ${month} ${year}`;
  };

  const getSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  console.log("Title and Description before Link:", title, description, dat);

  return (
    <>
     <div className="card my-2 d-flex flex-column flex-md-row align-items-start">
  <div className="d-flex flex-fill flex-column flex-md-row">
    <img
      src={ImageURL}
      className="card-img img-fluid mb-2 mb-md-0 fixed-size-img"
      alt="..."
    />
    <div
      className="flex-grow-1 d-flex flex-column justify-content-between p-3"
    >
      <div>
        <h5 className="card-title">{truncateString(title, 70)}</h5>
        <p className="card-text">{truncateString(description, 350)}</p>
      </div>
    </div>
  </div>
  <div
    className="d-flex align-items-center mt-2 mt-md-0 p-3"
  >
    <button onClick={handleReadArticle} className="btn btn-primary">
      Read Article
    </button>
  </div>
</div>

    </>
  );
};

export default NewsItem;

