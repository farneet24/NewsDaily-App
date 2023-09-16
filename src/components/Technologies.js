// I made 2 copies of the FAQ code newacc.css for FAQ.js and newacc2.css for Technologies.js, just to avoid ruining each other at the same time
import React, { useEffect } from "react";
import "../newacc2.css";

const Tech = () => {
  var accordionnewButtons = document.querySelectorAll(".accordion-new2 button");

  accordionnewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-new2 button");

    function toggleAccordion() {
      const itemToggle = this.getAttribute("aria-expanded");

      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-expanded", "false");
      }

      if (itemToggle === "false") {
        this.setAttribute("aria-expanded", "true");
      }
    }

    items.forEach((item) => item.addEventListener("click", toggleAccordion));

    return () => {
      items.forEach((item) =>
        item.removeEventListener("click", toggleAccordion)
      );
    };
  }, []);

  // Your JSX code here...
  return (
    <div class="container">
      {/* <h1 style={{textAlign : 'center'}}>Under the Hood: Technologies Powering the Platform</h1> */}
      <div class="accordion-new2">
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-1" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-code" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Front-end and Back-end Frameworks</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Crafted with a hybrid architecture, NewsDaily leverages React for the front-end to deliver a dynamic, high-performance user interface. On the back-end, Django serves as the robust framework facilitating secure data handling and business logic execution. The front and back-end components communicate seamlessly through RESTful APIs.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-2" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-brain" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Large Language Models (LLMs)</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            The platform capitalizes on the advanced natural language processing capabilities of GPT-4 LLM to provide personalized article summaries and keyword extraction. This implementation brings computational linguistics to the forefront of news consumption, enhancing user engagement and content assimilation.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-3" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-lock" style={{ marginRight: "10px" }}></i>
              {"   "}
              <strong>User Authentication and Security</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Utilizing Django's built-in authentication and security features, NewsDaily prioritizes data integrity and user privacy. The platform incorporates a multi-layered security protocol, ensuring robust and secure user authentication.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-4" aria-expanded="false">
            <span class="accordion-new2-title">
              <i className="fas fa-search" style={{ marginRight: "10px" }}></i>{" "}
              <strong>Context-Enriched Search via Custom Google Search API</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            Employing Google's Custom Search API, the platform augments keyword-based search results with contextually relevant external resources. This feature serves as an efficient bridge between news articles and additional informational content, enriching the user's understanding of the topics.
            </p>
          </div>
        </div>
        <div class="accordion-new2-item">
          <button id="accordion-new2-button-5" aria-expanded="false">
            <span class="accordion-new2-title">
              <i
                className="fas fa-newspaper"
                style={{ marginRight: "10px" }}
              ></i>{" "}
              <strong>News Aggregation through NewsAPI</strong>
            </span>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new2-content">
            <p>
            NewsDaily integrates NewsAPI to fetch real-time articles from a plethora of reputable sources. This ensures that the platform provides timely, diverse, and comprehensive coverage of current events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;
