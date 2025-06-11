/** @format */

import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import "./AboutSec.scss";
import CommonHeading from "@/common/CommonHeading/CommonHeading";
import { Button } from "@/common";
import { IMAGES } from "@/lib/images.s3";
import { S3_URL } from "@/constants";
import Link from "next/link";

const AboutSec = () => {
  return (
    <>
      <section className="about_sec py-100" id="about">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="order-md-last">
              <div className="about_sec_img">
                <img src={S3_URL + IMAGES?.about_img} alt="img" />
              </div>
            </Col>
            <Col md={6} className="mt-md-0 mt-5">
              <div className="same_content_sec">
                <div data-text="About" className="stroke_text"></div>
                <CommonHeading
                  heading="About Ozolio"
                  text="Ozolio is a Live Streaming and Webcam Hosting platform that allows customers to broadcast their live content 24/7 to multiple locations, such as websites, social platforms, mobile apps, and smart TV apps. While customers focus on building community, trust, and brand awareness with their audience, Ozolio simplifies the complexities of live streaming and protects the customer’s live content."
                />
                <CommonHeading
                  text="With a dedicated and consistent development effort, we transformed a simple streaming solution into a complex media cloud made up of multiple clusters located worldwide. We believe that by simplifying and popularizing 24/7 Live Streaming, we can increase transparency, raise awareness, expand people’s choices, combat media manipulation, and promote a more authentic view of reality.
"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Link
                    href="https://www.ozolio.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button className="learn_btn" text="Visit our website" />
                  </Link>
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutSec;
