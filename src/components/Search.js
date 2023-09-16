import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const totalResultsStyle = {
  //   position: "absolute",
  //   top: "15%",
  left: "50%",
  fontSize: "1.5rem",
  backgroundColor: "#080202",
  padding: "0% 0% 0% 25px",
  color: "#AFD3E2",
  borderRadius: "5px",
  zIndex: 2, // optional, only if you need to put it above other layers
};

const Search = ({ country, pageSize, category, apikey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const fetchData = async (pageNum) => {
    setLoading(true);
    let url = "";
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}&page=${pageNum}&pagesize=${100}&language=en`;
    } else {
      return;
    }
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
    if (query) {
      // Reset the state variables
      setArticles([]);
      setPage(1);
      setTotalResults(0);
      setHasFetchedInitialData(false);

      // Fetch the initial data
      fetchData(1);
    }
  }, [query]); // React to query changes here

  const fetchMoreData = () => {
    if (hasFetchedInitialData && articles.length < totalResults) {
      fetchData(page);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "90px 0px 45px 0px" }}>
        Search results for '{query}'
      </h1>

      {/* Display total results if available */}
      {totalResults > 0 && (
        <div className="container" style={totalResultsStyle}>
          Found {totalResults} results
        </div>
      )}

      {/* Show spinner if loading */}
      {loading && <Spinner />}

      {/* Show the infinite scroll component */}
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

      {/* Show a message if no articles are found */}
      {totalResults === 0 && !loading && (
        <h2 className="text-center">No relevant articles found.</h2>
      )}
    </>
  );
};

export default Search;
