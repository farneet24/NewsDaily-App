import React, { useState } from "react";
import Navigation from "./NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import News from "./News";
import LoadingBar from 'react-top-loading-bar';
import ArticlePage from "./ArticlePage";
import Contact from "./Contact";
import About from './About'
import Search from "./Search";


const Home = ({ firstName, handleLogout }) => {
  // const key = process.env.REACT_APP_NEWS;
  // const key = "32f68f1b695f42a0b7f90691af7225f5"
  const key = process.env.REACT_APP_NEWS;
  let [progress, setProgress] = useState(0);


  return(
  <div>
   <Router>
          <Navigation firstName={firstName} handleLogout={handleLogout}/>
          <LoadingBar
          height={3}
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }  key="general" category="general" country="in" />} />
            <Route exact path="/business"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }   key="business" category="business" country="in" />} />
            <Route exact path="/entertainment"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }   key="entertainment" category="entertainment" country="in" />} />
            <Route exact path="/health"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }   key="health" category="health" country="in" />} />
            <Route exact path="/science"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }   key="science" category="science" country="in" />} />
            <Route exact path="/sports" element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }    key="sports" category="sports" country="in" />} />
            <Route exact path="/technology"  element={<News apikey={key} setProgress={(progress)  => setProgress(progress) }   key="technology" category="technology" country="in" />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search apikey={key} setProgress={(progress) => setProgress(progress)} />} />
          </Routes>
    </Router>
  </div>);
};

export default Home;
