import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import darklogo from "./darklogo.png";

const Navigation = ({ firstName, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("home"); // Define the state for active tab
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => handleTabClick("home")}
          >
            <img src={darklogo} alt="logo" className="logo-image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                  onClick={() => handleTabClick("home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "business" ? "active" : ""
                  }`}
                  to="/business"
                  onClick={() => handleTabClick("business")}
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "entertainment" ? "active" : ""
                  }`}
                  to="/entertainment"
                  onClick={() => handleTabClick("entertainment")}
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "health" ? "active" : ""
                  }`}
                  to="/health"
                  onClick={() => handleTabClick("health")}
                >
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "science" ? "active" : ""
                  }`}
                  to="/science"
                  onClick={() => handleTabClick("science")}
                >
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "sports" ? "active" : ""
                  }`}
                  to="/sports"
                  onClick={() => handleTabClick("sports")}
                >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeTab === "technology" ? "active" : ""
                  }`}
                  to="/technology"
                  onClick={() => handleTabClick("technology")}
                >
                  Technology
                </Link>
              </li>
            </ul>
            <form
              className="d-flex search-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim() !== "") {
                  navigate(`/search?query=${searchQuery}`);
                }
              }}
            >
              <div className="input-group position-relative">
                <input
                  className="form-control me-2 search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim() !== "") {
                      navigate(`/search?query=${searchQuery}`);
                    }
                  }}
                  style={{ paddingRight: "30px" }} // Right padding
                />
                {searchQuery && (
                  <span
                    className="position-absolute"
                    onClick={() => setSearchQuery("")}
                    style={{
                      top: "50%",
                      right: "15px",
                      cursor: "pointer",
                      transform: "translateY(-55%)",
                      zIndex: "1000", // High z-index
                      color: "#FE0000", // Bright color
                    }}
                  >
                    ✖
                  </span>
                )}
              </div>
              <button
                className="btn btn-outline-success search-button"
                type="button"
                onClick={() => {
                  if (searchQuery.trim() !== "") {
                    navigate(`/search?query=${searchQuery}`);
                  }
                }}
              >
                Search
              </button>
            </form>

            <br />
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Welcome {firstName}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {" "}
                {/* Added dropdown-menu-end */}
                <li>
                  <Link className="dropdown-item" to="/about">
                    About NewsDaily
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                    style={{ color: "red" }}
                  >
                    Logout
                  </button>{" "}
                </li>
              </ul>
            </li>

            <br />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
