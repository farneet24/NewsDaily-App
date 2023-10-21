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
  const newsapi = process.env.REACT_APP_NEWS;

  const fetchData = async (pageNum) => {
    setLoading(true);
    
    const queryObj = {
      "$query": {
        "$and": [
          { "keyword": category },
          { "lang": "eng" }
        ]
      }
    };
  
    const queryString = encodeURIComponent(JSON.stringify(queryObj));
    const url = `https://eventregistry.org/api/v1/article/getArticles?query=${queryString}&dataType=news&resultType=articles&articlesPage=${pageNum}&articlesCount=${100}&includeArticleImage=true&includeArticleConcepts=true&articlesSortBy=rel&includeArticleSocialScore=true&includeArticleCategories=true&includeArticleLocation=true&includeArticleVideos=true&includeArticleLinks=true&includeConceptImage=true&apiKey=${newsapi}`;
    
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log('The data is like this', parsedData)
    if (parsedData.articles && Array.isArray(parsedData.articles.results)) {
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles.results]);
      setTotalResults(parsedData.articles.totalResults);
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
          <div className="row" id="newscard">
          {articles.map((element, index) => {
            if (element.image) { // Checking if element.image is not empty
              return (
                <div className="col-md-12" key={index}>
                  <NewsItem
                    title={element.title || "Title Not Available"}
                    description={
                      element.body || "Description Not Available"
                    }
                    ImageURL={
                      element.image ||
                      "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"
                    }
                    NewsURL={element.url}
                    author={element.authors}
                    date={element.dateTime}
                    dat={element}
                    sourc={element.source}
                    concepts={element.concepts}
                    index={index}
                  />
                </div>
              )
            }
            return null; // If element.image is empty, return null
          })}
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
