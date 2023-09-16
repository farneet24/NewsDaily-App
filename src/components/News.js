import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = ({ country, pageSize, category, apikey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  const fetchData = async (pageNum) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?&category=${category}&apiKey=${apikey}&page=${pageNum}&pagesize=${100}&language=en`;
    const data = await fetch(url);
    const parsedData = await data.json();

    if (parsedData.articles && Array.isArray(parsedData.articles)) {
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
      setTotalResults(parsedData.totalResults);
      setPage(pageNum + 1);
      if (!hasFetchedInitialData) {
        setHasFetchedInitialData(true);
      }
    } else {
      console.error("API did not return articles:", parsedData);
      return;
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect running with:", {
      country,
      hasFetchedInitialData,
      category,
      apikey,
      pageSize,
    });
    if (!hasFetchedInitialData) {
      console.log("Fetching initial data");
      fetchData(1);
    }
  }, [country, hasFetchedInitialData, category, apikey, pageSize]);

  const fetchMoreData = () => {
    if (hasFetchedInitialData && articles.length < totalResults) {
      fetchData(page);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "90px 0px 45px 0px" }}>
        Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-12" key={index}>
                {" "}
                {/* This change ensures each article takes up a full row */}
                <NewsItem
                  title={element.title || "Title Not Available"}
                  description={
                    element.description || "Description Not Available"
                  }
                  ImageURL={
                    element.urlToImage ||
                    "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
                  }
                  NewsURL={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

News.defaultProps = {
  country: "in",
  pageSize: 100,
  category: "general",
};

export default News;
