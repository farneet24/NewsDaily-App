import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav({ firstName, handleLogout }) {
  let [activeTab, setActiveTab] = useState("home"); // Define the state for active tab
  let [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  let navigate = useNavigate();

  let handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    // Get elements
    let tabsNewAnim = document.querySelector("#navbarSupportedContent");
    let selectorNewAnim = document
      .querySelector("#navbarSupportedContent")
      .querySelectorAll("li").length;
    let activeItemNewAnim = tabsNewAnim.querySelector(".active");
    let activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
    let activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
    let itemPosNewAnimTop = activeItemNewAnim.offsetTop;
    let itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;

    // Set initial styles
    let horiSelector = document.querySelector(".hori-selector");
    horiSelector.style.top = itemPosNewAnimTop + "px";
    horiSelector.style.left = itemPosNewAnimLeft + "px";
    horiSelector.style.height = activeWidthNewAnimHeight + "px";
    horiSelector.style.width = activeWidthNewAnimWidth + "px";

    // Click event handler
    let clickHandler = (e) => {
      let liItems = document.querySelectorAll("#navbarSupportedContent ul li");
      liItems.forEach((li) => li.classList.remove("active"));
      e.target.classList.add("active");
      let activeWidthNewAnimHeight = e.target.offsetHeight;
      let activeWidthNewAnimWidth = e.target.offsetWidth;
      let itemPosNewAnimTop = e.target.offsetTop;
      let itemPosNewAnimLeft = e.target.offsetLeft;
      horiSelector.style.top = itemPosNewAnimTop + "px";
      horiSelector.style.left = itemPosNewAnimLeft + "px";
      horiSelector.style.height = activeWidthNewAnimHeight + "px";
      horiSelector.style.width = activeWidthNewAnimWidth + "px";
    };
    document
      .querySelector("#navbarSupportedContent")
      .addEventListener("click", clickHandler);

    // Resize event handler
    let resizeHandler = () => {
      setTimeout(() => {
        // Update values
        let activeItemNewAnim = tabsNewAnim.querySelector(".active");
        let activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
        let activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
        let itemPosNewAnimTop = activeItemNewAnim.offsetTop;
        let itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;

        // Update styles
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      }, 500);
    };
    window.addEventListener("resize", resizeHandler);

    // Navbar toggler click event handler

    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector(".navbar-collapse");
    navbarCollapse.style.display = "none";
    navbarToggler.addEventListener("click", () => {
      if (
        navbarCollapse.style.display === "none" ||
        navbarCollapse.style.display === ""
      ) {
        navbarCollapse.style.display = "block";
      } else {
        navbarCollapse.style.display = "none";
      }

      setTimeout(() => {
        // Update values
        let activeItemNewAnim = tabsNewAnim.querySelector(".active");
        let activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
        let activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
        let itemPosNewAnimTop = activeItemNewAnim.offsetTop;
        let itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;

        // Update styles
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      });
    });

    // Active class for current page
    let path = window.location.pathname.split("/").pop();
    let target = document.querySelector(
      '#navbarSupportedContent ul li a[href="' + path + '"]'
    );
    if (!path) {
      target = document.querySelector(
        '#navbarSupportedContent ul li a[href="index.html"]'
      );
    }
  }, []);

  return (
    <nav
      className="navbar-expand-custom navbar-mainbg"
      style={{ paddingBottom: "0px", paddingTop: "0px" }}
    >
      <div className="helly">
        <div className="navbar-brand navbar-logo">NewsDaily</div>
        <div className="okay">
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-white"></i>
          </button>
        </div>
      </div>
      <div className="collapse navbar-collapse">
        <div id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left" style={{ top: "26px" }}></div>
              <div className="right" style={{ top: "27px" }}></div>
            </div>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                aria-current="page"
                to="/"
                onClick={() => handleTabClick("home")}
                style={{ color: `${activeTab === "home" ? "black" : ""}` }}
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
                style={{ color: `${activeTab === "business" ? "black" : ""}` }}
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
                style={{
                  color: `${activeTab === "entertainment" ? "black" : ""}`,
                }}
              >
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "health" ? "active" : ""}`}
                to="/health"
                onClick={() => handleTabClick("health")}
                style={{ color: `${activeTab === "health" ? "black" : ""}` }}
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
                style={{ color: `${activeTab === "science" ? "black" : ""}` }}
              >
                Science
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeTab === "sports" ? "active" : ""}`}
                to="/sports"
                onClick={() => handleTabClick("sports")}
                style={{ color: `${activeTab === "sports" ? "black" : ""}` }}
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
                style={{
                  color: `${activeTab === "technology" ? "black" : ""}`,
                }}
              >
                Technology
              </Link>
            </li>
          </ul>
        </div>
        <div className="newnav">
          <form
            className="d-flex search-form px-3"
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
                style={{ marginTop: "10px", marginBottom: "10px" }}
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
              className="btn btn-success search-button"
              type="button"
              onClick={() => {
                if (searchQuery.trim() !== "") {
                  navigate(`/search?query=${searchQuery}`);
                }
              }}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Search
            </button>
          </form>
          <div className="dro">
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
