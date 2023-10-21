import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import FAQ from "./FAQ";
import Tech from "./Technologies";
import Footer from "./Footer";

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* This aligns the child components to the start */
`;

const TabButtons = styled.div`
  display: inline-flex; /* Changed from flex to inline-flex */
  max-width: 100%;
  flex-wrap: nowrap; // Prevent line wrapping
  overflow-x: auto; // Enable horizontal scrolling
  -webkit-overflow-scrolling: touch; // Enable smooth scrolling on iOS
  background-color: #282c34;
  border-radius: 8px 8px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 1);
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  @media (max-width: 600px) {
    overflow-x: auto;
  }
`;

const TabButton = styled.button`
  padding: 16px;
  min-width: 120px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#FFFFFF" : "#9FA2B4")};
  background-color: ${(props) => (props.active ? "#3D5AFE" : "#171A20")};
  border: none;
  transition: background-color 0.3s ease-in-out;
  flex-shrink: 0; // Prevent shrinking smaller than content size
  &:hover {
    background-color: #3d5afe;
    color: #ffffff;
  }

  @media (max-width: 600px) {
    flex: none;
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: 20px;
  border-radius: 0 0 8px 8px;
  background-color: "black"
  box-shadow:  "0px 4px 10px rgba(255, 255, 255, 0.1)"
`;

function About(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  let tabcontentStyle = {
    color: "#1E1E1E",
    backgroundColor: "#F1EFEF",
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "Secure Access",
      content: (
        <>
          With a strong emphasis on data security and user privacy, NewsDaily
          incorporates a secure authentication framework. This ensures the
          integrity and confidentiality of user-specific information and
          preferences.
          <br />
        </>
      ),
    },
    {
      title: "Real-time Article",
      content: (
        <>
          By interfacing with NewsAPI, NewsDaily ensures real-time access to a
          diverse range of news articles from reputable sources. This feature
          amplifies the platform’s capability to provide a comprehensive and
          up-to-date overview of current events.
          <br />
          {/* <img src="https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip" alt="Description" /> */}
        </>
      ),
    },
    {
      title: "Context-Enriched Search",
      content: (
        <>
          Integrating Custom Google Search API, NewsDaily augments extracted
          article keywords to fetch relevant external resources automatically.
          This enables users to deepen their understanding of subjects mentioned
          in the article without manual searches, thereby saving time and
          effort.
          <br />
          {/* <img src="https://images.theconversation.com/files/191827/original/file-20171025-25516-g7rtyl.jpg?ixlib=rb-1.1.0&rect=0%2C70%2C7875%2C5667&q=45&auto=format&w=926&fit=clip" alt="Description" /> */}
        </>
      ),
    },
    {
      title: "Context-Aware Summaries",
      content: (
        <>
          Employing GPT-4's advanced natural language processing capabilities,
          NewsDaily autonomously distills comprehensive news articles into
          concise summaries. This facilitates rapid comprehension and enhances
          user engagement.
          <br />
        </>
      ),
    },
  ];

  return (
    <>
    <div className="column boc">
      <br />
      <br />
      <br />
      <h1
        className="my-3 text-center"
        style={{
          animation: "fadeInUp 1s forwards",
        }}
      >
        Welcome to NewsDaily
      </h1>
      <br />
      <br />
      <div className="vertical-section">
        <p className="lead">
          Introducing NewsDaily: The preferred platform for curated,
          personalized news content aligned with individual preferences. Here,
          engagement transcends traditional reading to foster empowered
          interaction with information.
          <br />
          <br />
          NewsDaily recognizes the complexities of today's news landscape. To
          address this, a suite of specialized features aims to optimize the
          user's news consumption experience.
        </p>
      </div>
      <br />
      <br />
      <br />
      <h1
        className="text-center"
        style={{
          animation: "fadeInUp 1s forwards",
        }}
      >
        Features
      </h1>
      <br />
      <br />
      <TabContainer>
        <TabButtons>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </TabButton>
          ))}
        </TabButtons>
        <div>
          {tabs.map((tab, index) => (
            <TabContent
              key={index}
              active={activeTab === index}
              style={tabcontentStyle}
            >
              {tab.content}
            </TabContent>
          ))}
        </div>
      </TabContainer>
      <br />
      <br />
      <br />
      <br />
      <h1
        className="my-3 text-center"
        style={{
          animation: "fadeInUp 1s forwards",
        }}
      >
        Under the Hood: Technologies Powering the Platform
      </h1>
      <br />
      <br />
      <Tech />
      <br />
      <br />
      <br />
      <br />
      <h1
        className="text-center"
        style={{
          animation: "fadeInUp 1s forwards",
        }}
      >
        Frequently Asked Questions (FAQs)
      </h1>
      <br />
      <br />
      <FAQ />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
      <Footer />
    </>
  );
}

export default About;
