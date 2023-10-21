import React, { useEffect } from "react";
import "../newacc.css";

const FAQ = () => {
  var accordionnewButtons = document.querySelectorAll(".accordion-new button");

  accordionnewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.blur();
    });
  });

  useEffect(() => {
    const items = document.querySelectorAll(".accordion-new button");

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
      {/* <h2>Frequently Asked Questions</h2> */}
      <div class="accordion-new">
        <div class="accordion-new-item">
          <button id="accordion-new-button-1" aria-expanded="false">
            <strong class="accordion-new-title">
              How do I get started with NewsDaily?
            </strong>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            Once logged in, you can toggle between the news feed by selecting categories of interest such as Technology, Business, or Sports. Click the 'Read More' button to delve into content that catches your eye. Each article is equipped with features like summarization, keywords, and context-enriched links to provide a rich and insightful reading experience.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-2" aria-expanded="false">
            <strong class="accordion-new-title">
            How accurate is the article summary provided?
            </strong>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            Our article summaries are generated using advanced NLP algorithms, ensuring that you receive the most accurate and concise summary of the news article.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-3" aria-expanded="false">
            <strong class="accordion-new-title">
            Why am I seeing suggested external links with my search results?
            </strong>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            The external links are added to enrich your reading experience by providing additional information on the topic you are interested in. They are carefully curated to match the keywords in the articles.
            </p>
          </div>
        </div>
        <div class="accordion-new-item">
          <button id="accordion-new-button-4" aria-expanded="false">
            <strong class="accordion-new-title">
            How do I report a bug or issue?
            </strong>
            <span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-new-content">
            <p>
            Navigate to the 'Contact' tab in the dropdown menu and fill out the
              provided form with relevant details and issues you're
              experiencing. We'll address your concerns promptly.
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
