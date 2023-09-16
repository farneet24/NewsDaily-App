import React from "react";
import axios from "axios";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contact() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    // Make a POST request to Formspree with the form data
    axios
      .post("https://formspree.io/f/mrgvyjrd", formData)
      .then(() => {
        // Reset the form data
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
    <br />
    <br />
      <div class="content">
        <div id="full">
          <div class="row justify-content-center" id="con">
            <div class="col-md-10">
              <div class="row justify-content-center">
                <div class={`col-md-6 text-light my-4`}>
                  <h3
                    class="heading mb-4 mx-2"
                    style={{ animation: "fadeInUp 1s forwards" }}
                  >
                    Let's talk about everything!
                  </h3>
                  <p style={{ animation: "fadeInUp 1s forwards" }}>
                    Get in touch with us and let us know how we can assist you.
                    We're always here to help!
                  </p>
                  <p>
                    <img
                      src="https://preview.colorlib.com/theme/bootstrap/contact-form-16/images/undraw-contact.svg"
                      alt="formPhoto"
                      class="img-fluid"
                    />
                  </p>
                </div>
                <div class="col-md-6">
                  <form
                    class="mb-5"
                    action="https://formspree.io/f/mrgvyjrd"
                    method="POST"
                    id="contactForm"
                    name="contactForm"
                    onSubmit={handleSubmit}
                  >
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <input
                          type="text"
                          class={`form-control bg-dark text-light`}
                          name="name"
                          id="name"
                          value={formData.name}
                          placeholder="Your name"
                          minLength={2}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <input
                          type="email"
                          class={`form-control bg-dark text-light`}
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <GrammarlyEditorPlugin clientId="client_BjCz9ioNF9BuopLyuwyCkC">
                          <input
                            placeholder="Subject (Optional)"
                            type="text"
                            className={`form-control bg-dark text-light`}
                            style={{
                              "#subject::placeholder": {
                                color: "white",
                              },
                            }}
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            minLength={4}
                          />
                        </GrammarlyEditorPlugin>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 form-group my-3">
                        <GrammarlyEditorPlugin clientId="client_BjCz9ioNF9BuopLyuwyCkC">
                          <textarea
                            class={`form-control bg-dark text-light`}
                            name="message"
                            id="message"
                            cols="30"
                            rows="10"
                            placeholder="Write your message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </GrammarlyEditorPlugin>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <input
                          type="submit"
                          value="Send Message"
                          class="btn btn-primary rounded-0 py-2 px-4"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="js/jquery-3.3.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/jquery.validate.min.js"></script>
      <script src="js/main.js"></script>
    </div>
  );
}

export default Contact;
