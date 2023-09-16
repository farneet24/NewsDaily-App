import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommend = ({ articleText }) => {
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [isSourceClosed, setIsSourceClosed] = useState(false); // New state variable
  const openedSessions = new Set();

  const googleCustomSearch = async (search_query) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: "AIzaSyA4CEs3IPYXnGOn6eb6ayVDIFK7ZtnBq9s",
            cx: "75c14f6eb60034672",
            q: search_query,
          },
        }
      );

      if (response.data.items) {
        setSearchResults((prevState) => ({
          ...prevState,
          [search_query]: response.data.items,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeywords = async () => {
    const sendData = async () => {
      try {
        const response = await axios.post(
          "https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/storeComments/",
          {
            articleText: articleText,
          }
        );

        console.log("Response:", response.data);
        const { sessionId } = response.data;

        const source = new EventSource(
          `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/${sessionId}/keywords/`
        );
        let accumulatedText = ""; // Local variable to accumulate streamed text

        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }

        openedSessions.add(sessionId);

        source.onmessage = (event) => {
          accumulatedText += event.data;
          console.log(event.data);
        };

        source.addEventListener(
          "done",
          () => {
            const cleanedText = accumulatedText.replace(/\d+\.\s+/g, "");
            const keywordList = cleanedText.split("/n").filter(Boolean);
            setKeywords(keywordList);
            setIsSourceClosed(true); // Set to true when EventSource is closed
            console.log(keywordList);
            source.close();
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
