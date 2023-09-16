import React, { useState, useEffect } from "react";

const Message = ({ type, message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return visible ? (
    <div className={`message ${type}`}>
      <span>{message}</span>
    </div>
  ) : null;
};


const LoginPage = ({
  handleLogin,
  toggleSignUp,
  handleInputChange,
  formData,
  successMessage,
  errorMessage,
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    // Function to check if the string is alphanumeric
    const isAlphanumeric = (str) => /^[a-zA-Z0-9]+$/.test(str);

    if (!formData.username || formData.username.length === 0) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!isAlphanumeric(formData.username)) {
      setUsernameError("Username should be alphanumeric");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!formData.password || formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      handleLogin();
    }
  };

  const [isPassword, setIsPassword] = useState(true);

  const togglePassword = (e) => {
    e.preventDefault(); // Stop default form submission
    setIsPassword(!isPassword);
  };

  return (
    <div
      className="copyMe"
      style={{ backgroundColor: "rgb(6, 10, 33)", height: "100vh" }}
    >
      <div className="shortPageWrapper">
        {/* Navbar */}
        <div className="navbar smaller">
          <div className="container">
            <div className="footerFlexContainer">
              <a href="/old-home" className="logo wNavBrand">
                <div className="logoSvg wEmbed">NewsDaily</div>
              </a>
              <a
                role="button"
                href="signup"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  toggleSignUp();
                }}
                className="navLink last"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flexStackCenter">
          <div className="formWrapper">
            <h1 className="formHeader">Log in</h1>
            <form
              id="wfFormLogin"
              name="wfFormLogin"
              dataname="login"
              method="get"
              datamsform="login"
              className="formContainer"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleSubmit(); // Your custom submit function
              }}
            >
              {/* Input Fields */}
              <div className="text-field-wrapper">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <div className="input-border">
                  <input
                    type="text"
                    className="input w-input"
                    maxLength="256"
                    name="username"
                    data-name="username"
                    placeholder="Username should be alphanumeric e.g. howard7"
                    id="username"
                    data-ms-member="email"
                    required
                    onChange={handleInputChange}
                    value={formData ? formData.username : ""}
                  />
                  {usernameError && (
                    <div className="error">{usernameError}</div>
                  )}
                </div>
              </div>
              <div className="text-field-wrapper">
                <div className="relative">
                  <label htmlFor="Password-3" className="input-label">
                    Password
                  </label>
                  <div className="show-hide-wrap w-tabs">
                    <div id="transformButton" className="w-tab-menu">
                      <button
                        onClick={togglePassword}
                        className={`show-hide w-inline-block w-tab-link ${
                          isPassword ? "w--current" : ""
                        }`}
                      >
                        <div className="svg w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            height="auto"
                            viewBox="0 0 24 24"
                            width="1000px"
                            fill="currentColor"
                          >
                            <rect fill="none" height="24" width="24" />

                            <path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z" />
                          </svg>
                        </div>
                        <div>Hide</div>
                      </button>
                      <button
                        onClick={togglePassword}
                        className={`show-hide w-inline-block w-tab-link ${
                          isPassword ? "" : "w--current"
                        }`}
                      >
                        <div className="svg w-embed">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            height="auto"
                            viewBox="0 0 24 24"
                            width="1000px"
                            fill="currentColor"
                          >
                            <rect fill="none" height="24" width="24" />

                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </div>
                        <div>Show</div>
                      </button>
                    </div>
                    <div className="hide w-tab-content">
                      <div
                        className={`w-tab-pane ${
                          isPassword ? "" : "w--tab-active"
                        }`}
                      ></div>
                      <div
                        className={`w-tab-pane ${
                          isPassword ? "w--tab-active" : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="input-border">
                  <input
                    type={isPassword ? "password" : "text"}
                    className="input w-input"
                    maxLength="256"
                    name="password"
                    placeholder="8+ characters"
                    id="field"
                    onChange={handleInputChange}
                    value={formData ? formData.password : ""}
                    required
                  />
                  {passwordError && (
                    <div className="error">{passwordError}</div>
                  )}
                </div>
                <br />
                <input
                  onClick={handleSubmit}
                  type="submit"
                  value="Get Started →"
                  className="icon-btn w-button"
                />
              </div>
            </form>
            {successMessage && (
              <Message type="success" message={successMessage} />
            )}
            {errorMessage && <Message type="error" message={errorMessage} />}
          </div>
        </div>
      </div>
      <div className="extra-section login"></div>
    </div>
  );
};

export default LoginPage;
