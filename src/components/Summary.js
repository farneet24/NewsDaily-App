import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Summary = ({ articleText }) => {
  const commentsDiv = useRef(null);
  const commentsKey = useRef(null);
  const [shouldDisplaySummarization, setShouldDisplaySummarization] =
    useState(false);
  const [shouldDisplayKeyword, setShouldDisplayKeyword] = useState(false);
  const openedSessions = new Set(); // To keep track of all session IDs

  const displaySummary = (message) => {
    if (commentsDiv.current) {
      commentsDiv.current.innerHTML += message.replace(/\/n/g, "<br/>");
    }
  };

  const displayKeyword = (message) => {
    if (commentsKey.current) {
      console.log(message);
      commentsKey.current.innerHTML += message.replace(/\/n/g, "<br/>");
    }
  };

  const handleSummarize = async () => {
    // console.log(commentStrings);
    setShouldDisplaySummarization(true);
    // return;
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
          `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/stream/${sessionId}/`
        );

        // commentsDiv.current.innerHTML = "<br/><h1>Summarization</h1><br/>";
        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }

        openedSessions.add(sessionId); // Add to the set of opened sessions
        commentsDiv.current.innerHTML = "";
        source.onmessage = (event) => {
          displaySummary(event.data);
          if (commentsDiv.current) {
            const textContent =
              commentsDiv.current.textContent || commentsDiv.current.innerText;
            const words = textContent.split(/\s+/).filter(Boolean);
            if (words.length >= 1000) {
              source.close(); // Close the source if words exceed 1000
              displaySummary(
                "<span>Word limit reached. Closing stream...</span>"
              );
            }
          }
        };

        source.addEventListener(
          "done",
          () => {
            source.close();
          },
          false
        );

        source.onerror = (event) => {
          console.error("EventSource failed:", event);
          source.close();
          displaySummary("<span>Error occurred while fetching data.</span>");
        };
      } catch (error) {
        console.error("There was an error sending the data", error);
      }
    };

    sendData();
  };

  const handleKeywords = async () => {
    // console.log(commentStrings);
    setShouldDisplayKeyword(true);
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
          `https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/stream/${sessionId}/keywords/`
        );

        // Check for duplicate session IDs
        if (openedSessions.has(sessionId)) {
          console.log("Duplicate session ID. Closing source.");
          source && source.close();
          return;
        }
        // commentsDiv.current.innerHTML = "<br/><h1>Summarization</h1><br/>";
        openedSessions.add(sessionId); // Add to the set of opened sessions
        commentsKey.current.innerHTML = "";

        source.onmessage = (event) => {
          displayKeyword(event.data);
          if (commentsKey.current) {
            const textContent =
              commentsKey.current.textContent || commentsKey.current.innerText;
            const words = textContent.split(/\s+/).filter(Boolean);
            if (words.length >= 1000) {
              source.close(); // Close the source if words exceed 1000
              displayKeyword(
                "<span>Word limit reached. Closing stream...</span>"
              );
            }
          }
        };

        source.addEventListener(
          "done",
          () => {
            console.log("EventSource 'done' event received");
            source.close();
          },
          false
        );

        source.onerror = (event) => {
          console.error("EventSource failed:", event);
          source.close();
          displayKeyword("<span>Error occurred while fetching data.</span>");
        };
      } catch (error) {
        console.error("There was an error sending the data", error);
      }
    };

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
    handleKeywords();
  }, [articleText]);

  return (
    <>
      {shouldDisplaySummarization && (
        <div
          style={{
            background: "#1F1F1F",
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
              color: "#F1F1F1",
            }}
          >
            Summary
          </h1>
          <div
            style={{
              background: "#2E2E2E",
              color: "#E1E1E1",
              padding: "15px",
              borderRadius: "10px",
              fontSize: window.innerWidth <= 768 ? "0.72rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsDiv}
          ></div>
        </div>
      )}

      {shouldDisplayKeyword && (
        <div
          style={{
            background: "#1F1F1F",
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
              color: "#F1F1F1",
            }}
          >
            Keywords
          </h1>
          <div
            style={{
              background: "#2E2E2E",
              color: "#E1E1E1",
              padding: "15px",
              borderRadius: "10px",
              fontSize: window.innerWidth <= 768 ? "0.72rem" : "1rem",
              lineHeight: "1.6",
            }}
            ref={commentsKey}
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


