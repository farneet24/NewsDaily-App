import React, { useState, useEffect } from "react";

const Recommend = ({ articleText }) => {
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [isSourceClosed, setIsSourceClosed] = useState(false); // New state variable

  const googleCustomSearch = async (search_query) => {
    try {
      const url = new URL("https://www.googleapis.com/customsearch/v1");
      url.search = new URLSearchParams({
        key: "AIzaSyA4CEs3IPYXnGOn6eb6ayVDIFK7ZtnBq9s",
        cx: "75c14f6eb60034672",
        q: search_query,
      });
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.items) {
        setSearchResults((prevState) => ({
          ...prevState,
          [search_query]: data.items,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleKeywords = async () => {
    const sendData = async () => {
      try {
        const response = await fetch("https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/storeComments/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleText: articleText,
          }),
        });
  
        const data = await response.json();
        console.log("Response:", data);
  
        const { sessionId } = data;
  
        // Your existing EventSource logic remains unchanged
        const source = new EventSource(
          `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/${sessionId}/keywords/`
        );
        // ... (rest of your code)
  
      } catch (error) {
        console.error("There was an error sending the data", error);
      }
    };
  
    sendData();
  };
  

  useEffect(() => {
    if (!articleText) {
      return;
    }
    handleKeywords();
  }, [articleText]);

  useEffect(() => {
    if (!isSourceClosed || !keywords) {
      // Run only when EventSource is closed and keywords exist
      return;
    }
    console.log("I am here");
    console.log(keywords);
    keywords.forEach((keyword) => {
      googleCustomSearch(keyword);
    });
  }, [isSourceClosed, keywords]); // Depend on isSourceClosed and keywords

  return (
    <>
      <div id="recommend-container">
        <h1 className="recommend-heading">Curated Insights Based on Article Keywords</h1>
        {keywords.map((keyword, index) => (
          searchResults[keyword]?.length > 0 ? ( // Check if search results exist for the keyword
            <div key={index} className="keyword-section">
              <div className="keyword-card">
                <div className="keyword-content">
                  <h3 className="keyword-link-title">
                    {searchResults[keyword][0].title}
                  </h3>
                  <a
                    href={searchResults[keyword][0].link}
                    target="_blank"
                    rel="noopener"
                    className="keyword-link"
                  >
                    Visit Site
                  </a>
                  <p className="keyword-snippet">
                    {searchResults[keyword][0].snippet}
                  </p>
                </div>
              </div>
            </div>
          ) : null  // Skip rendering the card if no results found
        ))}
      </div>
    </>
  );
  
  
};

export default Recommend;

