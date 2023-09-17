import React, { useState, useEffect } from "react";
import SignUpForm from "./components/SignUp";
import LoginPage from "./components/Login";
import Home from "./components/Home";

function App() {
  // State to track whether to show the SignUp page
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // Function to toggle between Login and SignUp
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setSuccessMessage("");
    setFormData({
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    });
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  // Function to reset form data
  const resetFormDataSignUp = () => {
    setFormData({
      first_name: "",
      last_name: "",
      username: "",
      password: "",
    });
  };

  // Function to reset form data
  const resetFormDataLog = () => {
    setFormData({
      username: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    console.log(FormData);

    fetch("https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/signup/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setIsAuthenticated(true);
          setFirstName(formData.first_name);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("firstName", formData.first_name);
          resetFormDataSignUp();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLogin = () => {
    console.log(formData); // Make sure you've spelled this correctly. JavaScript is case-sensitive.
    const { username, password } = formData;

    fetch("https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          setIsAuthenticated(true);
          setFirstName(data.first_name); // Assuming the server returns the first_name in the response
          // Save to localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("firstName", data.first_name);
          resetFormDataLog();
        } else if (data.status === "failure") {
          setErrorMessage("Invalid credentials");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred");
        setSuccessMessage("");
      });
  };

  const handleLogout = () => {
    fetch("https://newsdailyfarneet-9e2e933f25bb.herokuapp.com/logout/")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "logged out") {
          setIsAuthenticated(false);
          // Remove from localStorage
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("firstName");
          setSuccessMessage("Logged out successfully!");
          setErrorMessage("");
          resetFormDataLog();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Inside your main function or useEffect to check local storage on component load
  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    const storedFirstName = localStorage.getItem("firstName");

    if (storedIsAuthenticated === "true") {
      setIsAuthenticated(true);
      setFirstName(storedFirstName);
    }
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Home firstName={firstName} handleLogout={handleLogout} />
      ) : showSignUp ? (
        <SignUpForm
          formData={formData}
          handleInputChange={handleInputChange}
          toggleSignUp={toggleSignUp}
          handleSignup={handleSignup}
        />
      ) : (
        <LoginPage
          formData={formData}
          handleInputChange={handleInputChange}
          toggleSignUp={toggleSignUp}
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
    </div>
  );
}

export default App;

