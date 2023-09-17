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

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };


  return (
    <>
      <div className="card my-2 d-flex flex-column flex-md-row align-items-start">
        <div className="d-flex flex-fill flex-column flex-md-row">
          <img
            src={ImageURL}
            className="card-img img-fluid mb-2 mb-md-0 fixed-size-img"
            alt="..."
          />
          <div className="flex-grow-1 d-flex flex-column justify-content-between p-3">
            <div>
              <h5 className="card-title">{truncateString(title, 70)}</h5>
              <p className={`card-text description-small-screen`}>
                {description && description.includes('"id"')
                  ? "Description not available"
                  : truncateString(description, 350)}
              </p>
            </div>
          </div>
        </div>
        <div
          className="d-flex align-items-center mt-2 mt-md-0 p-3"
          id="readmorebutton"
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

