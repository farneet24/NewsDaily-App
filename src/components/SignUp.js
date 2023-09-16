import React, { useState } from "react";



const SignUpForm = ({
  handleSignup,
  toggleSignUp,
  handleInputChange,
  formData,
}) => {
  const [isPassword, setIsPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData && formData.password.length >= 8) {
      handleSignup(); // Call the handleSignup function passed as a prop
    } else {
      setPasswordError("Password must be at least 8 characters");
    }
  };

  const togglePassword = (e) => {
    e.preventDefault(); // Stop default form submission
    setIsPassword(!isPassword);
  };

  const validatePassword = (e) => {
    handleInputChange(e);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const alphanumericPattern = /^[a-zA-Z0-9]+$/;

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (alphanumericPattern.test(value) || value === "") {
      handleInputChange(e);
      setErrorMessage(null);
    } else {
      setErrorMessage("Username should be alphanumeric");
    }
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
              <a href="/old-home" className="logo wNavBrand logo-container">
                <div className="logoSvg wEmbed">NewsDaily</div>
              </a>
              <a
                role="button"
                href="login"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  toggleSignUp();
                }}
                className="navLink last"
              >
                Log in
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flexStackCenter">
          <div className="formWrapper">
            <h1 className="formHeader">Create an account</h1>
            <form
              id="wfFormLogin"
              name="wfFormLogin"
              dataname="login"
              method="get"
              datamsform="signup"
              className="formContainer"
            >
              {/* Input Fields */}
              <div className="flex-row-center">
                <div className="text-field-wrapper margin-left">
                  <label htmlFor="First-Name" className="input-label">
                    First Name
                  </label>
                  <div className="input-border">
                    <input
                      type="text"
                      className="input first-name w-input"
                      maxLength="256"
                      name="first_name"
                      data-name="First Name"
                      placeholder="Howard"
                      id="First-Name"
                      data-ms-member="first-name"
                      required=""
                      onChange={handleInputChange}
                      value={formData ? formData.first_name : ""}
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <label htmlFor="Last-Name" className="input-label">
                    Last Name
                  </label>
                  <div className="input-border">
                    <input
                      type="text"
                      className="input last-name w-input"
                      maxLength="256"
                      name="last_name"
                      data-name="Last Name"
                      placeholder="Thurman"
                      id="Last-Name"
                      data-ms-member="last-name"
                      required=""
                      onChange={handleInputChange}
                      value={formData ? formData.last_name : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="text-field-wrapper">
                <label htmlFor="username-2" className="input-label">
                  Username
                </label>
                <div className="input-border">
                  <input
                    type="text"
                    className="input w-input"
                    maxLength="256"
                    name="username"
                    data-name="username 2"
                    placeholder="Username should be alphanumeric e.g. howard7"
                    id="username-2"
                    data-ms-member="username"
                    required
                    onChange={handleUsernameChange}
                    value={formData ? formData.username : ""}
                  />
                </div>
              </div>
              <div className="text-field-wrapper">
                <div className="relative-2">
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
                    required
                    onChange={validatePassword}
                    value={formData ? formData.password : ""}
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
            {errorMessage && (
              <div className="w-form-fail">
                <div>{errorMessage}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="extra-section"></div>
    </div>
  );
};

export default SignUpForm;
