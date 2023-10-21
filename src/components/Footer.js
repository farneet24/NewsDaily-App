import React, { useState } from "react";

function Footer() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://formspree.io/f/mrgvyjrd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          email: "",
        });
        setSuccessMessage("Form submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000); // Message will disappear after 5 seconds
      })
      .catch((error) => {
        console.log("Error:", error);
        setErrorMessage('An error occurred. Please try again.');
        setTimeout(() => setErrorMessage(''), 5000);  // Message will disappear after 5 seconds
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <footer className="new_footer_area bg_color">
        <div className="new_footer_top">
          <div className="container px-4">
            <div className="row" style={{ alignItems: "flex-start" }}>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget company_widget wow fadeInLeft"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3 className="f-title f_600 t_color f_size_18">
                    Get in Touch
                  </h3>
                  <p>Let's Collaborate for Your Next Breakthrough !!!</p>
                  <form
                    action="#"
                    className="f_subscribe_two mailchimp"
                    method="post"
                    noValidate={true}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      name="email"
                      className="form-control memail"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <button className="btn btn_get btn_get_two" type="submit">
                      Say Hello
                    </button>
                    {successMessage && (
                      <p className="mchimp-sucmessage" style={{marginTop : '10px'}}>{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="mchimp-errmessage" style={{marginTop : '10px'}}>{errorMessage}</p>
                    )}
                  </form>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget about-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3 className="f-title f_600 t_color f_size_18">
                    Machine Learning Projects
                  </h3>
                  <ul className="list-unstyled f_list">
                    <li>
                      <a href="https://thread-mind.vercel.app/">
                        <i className="fas fa-comment-dots"></i> ThreadMind
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://farneet24-sms-spam-app-r53bi4.streamlit.app/"
                        target="_blank"
                      >
                        <i className="fas fa-envelope"></i> SMS/Email Spam
                        Analyzer
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://farneet24-chatanalyzer-app-pi7gil.streamlit.app/"
                        target="_blank"
                      >
                        <i className="fas fa-mobile-alt"></i> WhatsApp Chat
                        Analyzer
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget about-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3 className="f-title f_600 t_color f_size_18">
                    Web Development Projects
                  </h3>
                  <ul className="list-unstyled f_list">
                    <li>
                      <a href="#">
                        <i className="fas fa-newspaper"></i> NewsDaily
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="f_widget social-widget pl_70 wow fadeInLeft"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "fadeInLeft",
                  }}
                >
                  <h3 className="f-title f_600 t_color f_size_18">
                    Connect with Me
                  </h3>
                  <div className="f_social_icon">
                    <a href="mailto:farneetsingh_co21a3_72@dtu.ac.in">
                      <i class="fa-solid fa-envelope"></i>
                    </a>
                    <a href="https://github.com/farneet24" target="_blank">
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/farneet.singh/"
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/farneet-singh-6b155b208/"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>
        <br />
        <br />
      </footer>
    </div>
  );
}

export default Footer;
