import React from "react";
import { GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Swal from 'sweetalert2';


function Contact() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    // Prevent the default behavior of form submission
    e.preventDefault();
  
    // Make a POST request to Formspree with the form data
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
        // Reset the form data
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent.',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        // setMessage('Form submitted successfully!');
        // setMessageType('success');
        // setTimeout(() => setMessage(null), 5000);
      })
      .catch((error) => {
        console.log("Error:", error);
        // setMessage('An error occurred. Please try again.');
        // setMessageType('error');
        // setTimeout(() => setMessage(null), 5000);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      });
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <div>
    <br />
    <br />
    <br />
    <br />
    <br />
      <div class="content">
        <div id="full">
          <div class="row justify-content-center" id="con">
            <div class="col-md-10">
              <div class="row justify-content-center">
                <div class={`col-md-6 my-4`}>
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
                      src="https://ik.imagekit.io/bje8xuiyf/email-marketing-internet-chatting-24-hours-support_335657-3009-removebg-preview.png?updatedAt=1697735307621"
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
                          class={`form-control`}
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
                          class={`form-control`}
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
                            className={`form-control`}
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
                            class={`form-control`}
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
                  {/* {message && <div className={`alert alert-${messageType}`}>{message}</div>} */}
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
    <br />
    <br />
    <Footer />
    </>
  );
}

export default Contact;
