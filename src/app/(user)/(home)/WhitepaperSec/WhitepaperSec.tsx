/* eslint-disable @next/next/no-img-element */
import { Col, Container, Row } from "react-bootstrap";
import "./WhitepaperSec.scss";
import CommonHeading from "@/common/CommonHeading/CommonHeading";
import { Button } from "@/common";
import { S3_URL } from "@/constants";
import { IMAGES } from "@/lib/images.s3";

const WhitepaperSec = () => {
  const handleClick = () => {
    // Ensure BMDataLayer exists
    window.BMDataLayer = window.BMDataLayer || [];

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://static.bitmediacdn.com/bmEventManager.js?v=" + new Date().getTime();

    // Push the event after script is loaded
    script.onload = () => {

      // Conversion data with actual value instead of placeholder
      const conversionData = {
        conversionID: '67b7fdf99a62fcbf1efdae13',
        eventId: '54321',
        event: 'conversion',
        eventValue: '0.00' // Replace with actual value
      };

      window.BMDataLayer.push(conversionData);
    };

    script.onerror = () => {
      console.error("Failed to load tracking script");
      script.remove();
    };

    document.body.appendChild(script);
  };
  return (
    <>
      <section className="whitepaper_sec py-100" id="Whitepaper">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="whitepaper_sec_img">
                {/* <Image src={Whitepaperimg} alt="img" /> */}
                <img
                  className="repost_img"
                  src={S3_URL + IMAGES.White_paper_02}
                  alt="img"
                />
              </div>
            </Col>
            <Col md={6} className="mt-md-0 mt-5">
              <div className="same_content_sec">
                <div data-text="Whitepaper" className="stroke_text grey_bg"></div>
                <CommonHeading
                  heading="Download Whitepaper"
                  text="Please check out our Whitepaper to learn more about Ozolio's goals and values. Get more information about our current technology and development plans. Learn about market opportunities and industry highlights.
                  "
                />
                {/* <a href={`${S3_URL}Ozolio+whitepaper+19th+Sept.pdf`} download> */}
                <Button
                  className="learn_btn"
                  text="Download"
                  onClick={() => {handleClick(); window.open(S3_URL + "ozolio_token_whitepaper.pdf")}}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default WhitepaperSec;
