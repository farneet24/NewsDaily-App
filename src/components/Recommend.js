import React, { useState, useEffect } from "react";

const Recommend = ({ articleText, concepts }) => {
  const [hasResults, setHasResults] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [isSourceClosed, setIsSourceClosed] = useState(false); // New state variable
  const openedSessions = new Set();

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
        setHasResults(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeywords = async () => {
    const sendData = async () => {
      try {
        const response = await fetch(
          "https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/storeComments/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              articleText: articleText,
            }),
          }
        );

        const data = await response.json();
        console.log("Response:", data);

        const { sessionId } = data;

        // Your existing EventSource logic remains unchanged
        const source = new EventSource(
          `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/stream/${sessionId}/keywords/`
        );

        let accumulatedText = "";
        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }

        openedSessions.add(sessionId);

        source.onmessage = (event) => {
          accumulatedText += event.data;
        };

        source.addEventListener(
          "done",
          () => {
            const cleanedText = accumulatedText.replace(/\d+\.\s+/g, "");
            const keywordList = cleanedText.split("/n").filter(Boolean);
            setKeywords(keywordList);
            console.log(keywordList);
            source.close();
            setIsSourceClosed(true);
          },
          false
        );

        source.onerror = (event) => {
          console.error("EventSource failed:", event);
          source.close();
        };
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
    if (isSourceClosed) {
      if (keywords.length === 0) {
        // If keywords are empty, display concepts
        setHasResults(true);
      } else {
        // Otherwise, run Google Custom Search for each keyword
        keywords.forEach((keyword) => {
          googleCustomSearch(keyword);
        });
      }
    }
  }, [isSourceClosed, keywords]); // Depend on isSourceClosed and keywords

  return (
    <>
      <div id="recommend-container">
        {hasResults && (
          <h1 className="recommend-heading">
            Curated Insights Based on Article Keywords
          </h1>
        )}

        {keywords.map(
          (keyword, index) =>
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
            ) : null // Skip rendering the card if no results found
        )}
        {/* Fallback: Use concepts if keywords are empty and no results */}
        {keywords.length === 0 &&
          concepts.slice(0, 5).map(
            (
              concept,
              index // Slice array to get top 5
            ) => (
              <div key={index} className="keyword-section">
                <div className="keyword-card">
                  <div className="keyword-content">
                    <h3 className="keyword-link-title">{concept.label.eng}</h3>
                    <a
                      href={concept.uri}
                      target="_blank"
                      rel="noopener"
                      className="keyword-link"
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default Recommend;

  
};

export default Recommend;

