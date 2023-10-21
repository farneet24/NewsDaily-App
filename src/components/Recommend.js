import React, { useState, useEffect } from "react";
const OpenAI = require("openai");

// const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;; // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

const Recommend = ({ articleText, concepts }) => {
  const [hasResults, setHasResults] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [isrequestsend, setisrequestsend] = useState(false); // New state variable
  const [showDefaults, setshowDefaults] = useState(true);

  function truncateArticle(articleText) {
    const words = articleText.split(' ');
    const truncatedWords = words.slice(0, 1000);
    return truncatedWords.join(' ');
  }

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
        setisrequestsend(true);
        setshowDefaults(false);
      }
    } catch (error) {
      console.error(error);
      setisrequestsend(true);
    }
  };

  const handleKeywords = async () => {
  
    const sendData = async () => {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "user",
              "content": `Extract 5 proper nouns from the following article: ${truncateArticle(articleText)}`
            },
          ],
          stream: true,
        });
  
        let accumulatedText = "";
  
        for await (const chunk of completion) {
          if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
            let content = chunk.choices[0].delta.content;
            if (content !== undefined) {
              content = content.replace(/\n/g, '/n');  // Replace all occurrences of \n with /n
              accumulatedText += content;
            }
          }
        }
  
        const cleanedText = accumulatedText.replace(/\d+\.\s+/g, "");
        const keywordList = cleanedText.split("/n").filter(Boolean);
        setKeywords(keywordList);
        console.log('The keyword list is', keywordList);
  
      } catch (error) {
        console.error(`Error: ${error}`);
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
      console.log(keywords.length)
      if(!isrequestsend){
        if (keywords.length === 0) {
          // If keywords are empty, display concepts
          setHasResults(true);
          return;
          
        } else {
          // Otherwise, run Google Custom Search for each keyword
          keywords.forEach((keyword) => {
            googleCustomSearch(keyword);
          });
        }
      }
      else{
        setHasResults(true);
        setshowDefaults(true);
      }
  }, [keywords]); // Depend on isSourceClosed and keywords

  return (
    <>
      <div id="recommend-container">
        {hasResults && (
          <>
            <h1 className="recommend-heading">
              Curated Insights Based on Article Keywords
            </h1>
          </>
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
        {showDefaults &&
          concepts.slice(0, 5).map(
            (
              concept,
              index // Slice array to get top 5
            ) => (
              <div key={index} className="keyword-section">
                <div className="keyword-card">
                  <div className="keyword-content">
                    <h3 className="keyword-link-title" id="new">
                      {concept.label.eng}
                    </h3>
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
