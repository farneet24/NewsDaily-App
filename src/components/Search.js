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
  // backgroundColor: "#080202",
  padding: "0% 0% 0% 25px",
  color: "#192655",
  borderRadius: "5px",
  zIndex: 2, // optional, only if you need to put it above other layers
};

const Search = ({ country, pageSize, category, apikey, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  const [showNum, setshowNum] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const fetchData = async (pageNum) => {
    setLoading(true);
    // Construct the query object
    const queryObj = {
      $query: {
        $and: [
          { keyword: query }, // your category variable
          { lang: "eng" },
        ],
      },
    };

    // Convert the query object to a query string
    const queryString = encodeURIComponent(JSON.stringify(queryObj));

    // Construct the URL
    const url = `https://eventregistry.org/api/v1/article/getArticles?query=${queryString}&dataType=news&resultType=articles&articlesPage=${pageNum}&articlesCount=${100}&includeArticleImage=true&includeArticleConcepts=true&articlesSortBy=rel&apiKey=ef5627ca-d6b6-4b3e-8c05-46c5daeb6786`;

    const data = await fetch(url);
    const parsedData = await data.json();
    console.log('Parsed Data ', parsedData)
    if (parsedData.articles && Array.isArray(parsedData.articles.results)) {
      setArticles((prevArticles) => [...prevArticles, ...parsedData.articles.results]);
      setTotalResults(parsedData.articles.count); // Assuming 'count' holds the total number of articles
      setshowNum((parsedData.articles.count) * (parsedData.articles.pages))
      setPage(pageNum + 1);
      if (!hasFetchedInitialData) {
        setHasFetchedInitialData(true);
      }
    } else {
      console.error("API did not return articles:", parsedData);
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
          Found {showNum} results
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
                {" "}
                {/* This change ensures each article takes up a full row */}
                <NewsItem
                  title={element.title || "Title Not Available"}
                  description={
                    // getFirstSentence(element.body) || "Description Not Available"
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
