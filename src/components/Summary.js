import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const OpenAI = require("openai");

// const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your OpenAI API key
const apiKey = "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"; // Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

const Summary = ({ articleText }) => {
  const commentsDiv = useRef(null);
  const [shouldDisplaySummarization, setShouldDisplaySummarization] =
    useState(false);

  const displaySummary = (message) => {
    if (commentsDiv.current) {
      commentsDiv.current.innerHTML += message.replace(/\/n/g, "<br/>");
    }
  };

  function truncateArticle(articleText) {
    const words = articleText.split(' ');
    const truncatedWords = words.slice(0, 2000);
    return truncatedWords.join(' ');
  }
  

  const handleSummarize = async () => {
    setShouldDisplaySummarization(true);
    
    async function sendData() {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "user", "content": `Summarize the following news clearly in 15 points: ${truncateArticle(articleText)}`}
          ],
          stream: true,
        });
  
        for await (const chunk of completion) {
          if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
            let content = chunk.choices[0].delta.content;
            if (content !== undefined) {
              content = content.replace(/\n/g, '/n');  // Replace all occurrences of \n with /n
              displaySummary(content);
  
              const textContent =
                commentsDiv.current.textContent ||
                commentsDiv.current.innerText;
              const words = textContent.split(/\s+/).filter(Boolean);
              if (words.length >= 1000) {
                displaySummary(
                  "<span>Word limit reached. Closing stream...</span>"
                );
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  
    sendData();
  };
  

  useEffect(() => {
    if (!articleText) {
      // Handle this by setting a loading or error state
      return;
    }

    console.log("I am running");
    handleSummarize();
    console.log("I am running after summary");
    // eslint-disable-next-line
  }, [articleText]);

  return (
    <>
      {shouldDisplaySummarization && (
        <div
          style={{
            background: "#F4F4F4",
            borderRadius: "15px",
            color: "#FFFFFF",
            padding: "20px",
            margin: "20px auto",
            maxWidth: "100%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              paddingLeft: "0.5%",
              marginBottom: "20px",
              borderBottom: `3px solid ${"#3F3F3F"}`,
              color: "#333333",
              fontFamily : 'Roboto Slab',
            }}
          >
            Summary
          </h1>
          <div
            style={{
              background: "#DADADA",
              color: "#333333",
              padding: "15px",
              borderRadius: "10px",
              fontSize: window.innerWidth <= 768 ? "0.85rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsDiv}
          ></div>
        </div>
      )}
    </>
  );
};

Summary.propTypes = {
  articleText: PropTypes.string,
};

export default Summary;


