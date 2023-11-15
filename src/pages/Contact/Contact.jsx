import "../pages.css";
import Form from "../../components/Form";
import TagManager from "react-gtm-module";
import React from "react";
const Contact = () => {

  TagManager.dataLayer({
    dataLayer: {
      event: "button_click",
      eventCategory: "Button",
      eventAction: "Click",
      eventLabel: "My Button",
    },
  });
  return (
    <>
      <div id="contact" className="headerbackground mt-[69px]" >
        <h2 className="overview-heading   h2-heading-std">CONTACT US</h2>
      </div>
      <Form />
    </>
  );
};

export default Contact;
