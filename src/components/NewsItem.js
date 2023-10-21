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
  sourc,
  concepts,
  index,
}) => {
  const navigate = useNavigate(); // Note the change here

  const handleReadArticle = () => {
    navigate("/article", {
      state: {
        title,
        description,
        ImageURL,
        NewsURL,
        author,
        date,
        dat,
        sourc,
        concepts,
      },
    }); // Note the change here
  };

  function capitalizeWords(str) {
    return str.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  const handleAnomalousTitle = (title) => {
    // Custom logic to handle anomalies
    if (title.includes("@")) {
      const parts = title.split(" ");
      return parts.filter((part) => !part.includes("@")).join(" ");
    }
    return title;
  };

  const handleAnomalousDescription = (description) => {
    // Custom logic to handle anomalies
    if (description.includes("══")) {
      return description.split("══")[0] + "...";
    }
    return description;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let formattedDate = date.toLocaleDateString(undefined, options);
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    
    return `${formattedDate}, at ${strTime}`;
};


  const sanitizedTitle = handleAnomalousTitle(title);
  const sanitizedDescription = handleAnomalousDescription(description);
  const formattedDate = formatDate(date);

  console.log(
    "Title",
    typeof title,
    "Description",
    typeof description,
    "Image",
    typeof ImageURL,
    "NewsURL",
    typeof NewsURL,
    "Author",
    typeof author,
    "DATE",
    typeof date,
    "Date",
    typeof dat,
    "Source",
    typeof sourc,
    "Concepts",
    typeof concepts
  ); // Output: "string"

  return (
    <>
      <main>
        <div className="card">
          <div className="card__img">
            <picture>
              <source media="(min-width:600px)" srcSet={ImageURL} />
              <img src={ImageURL} alt={truncateString(title, 50)} />
            </picture>
          </div>
          <div className="card__content">
            <p class="card__tag">{sourc.title}</p>
            <h1 className="card__title" title={title}>
              {truncateString(capitalizeWords(sanitizedTitle), 85)}
            </h1>
            <p className="card__desc">
              {sanitizedDescription
                ? truncateString(sanitizedDescription, 320)
                : "Description not available"}
            </p>
            <div className="card__price">
              Published On: {formattedDate} ({timeSince(date)})
            </div>
            <button className="card__btn" onClick={handleReadArticle}>
              Read More
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewsItem;
