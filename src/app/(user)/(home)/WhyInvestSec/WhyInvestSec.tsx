import { Col, Container, Row } from "react-bootstrap";
import "./WhyInvestSec.scss";
import icon1 from "../../../../../public/assets/icon/strong_icon.svg";
import icon2 from "../../../../../public/assets/icon/experts_icon.svg";
import icon3 from "../../../../../public/assets/icon/market_icon.svg";
import icon4 from "../../../../../public/assets/icon/utility_icon.svg";
import Image from "next/image";
import CommonHeading from "@/common/CommonHeading/CommonHeading";
import { motion } from "framer-motion";
import Link from "next/link";
import { S3_URL } from "@/constants";
import { IMAGES } from "@/lib/images.s3";

const WhyInvestSec = () => {
  const investlist = [
    {
      iconimg: icon2,
      title: "Established Business",
      text: "Ozolio is far more than just a promising startup concept that might never come to fruition. We have successfully built a sophisticated and reliable technology that has already demonstrated its effectiveness. Today, we support a wide range of enterprise clients, including major names like Marriott, Hilton, the Houston Zoo, and the Clearwater Marine Aquarium, among others.",
    },
    {
      iconimg: icon3,
      title: "Growth Potential",
      text: "By offering the Ozolio token, we are making the first step toward developing a new scalable ecosystem. Decentralization, Real-time processing, Effective Protocols, and Reliable Hardware will ensure stable and sustainable growth for years to come.",
    },
    {
      iconimg: icon4,
      title: "Token Utility",
      text: "Along with premium user-level features such as ad-free content and unlimited access to live streams without timeouts, the new Ozolio ecosystem will offer developers the ability to develop complex web and mobile applications with exclusive development APIs.",
    },
  ];
  return (
    <>
      <section className="invest_sec" id="highlights">
        <div className="invest_sec_img">
          <img src={S3_URL + IMAGES.Why_Invest_Cam} alt="img" />
        </div>
        <Container>
          <Row className="align-items-center py-60">
            <Col lg={8} className="mt-md-0 mt-5">
              <div className="same_content_sec">
                <div data-text="Highlights" className="stroke_text"></div>
                <CommonHeading
                  heading="Why Ozolio"
                  text="Recent advancements in AI and computational technologies have enabled the real-time
                  processing of video streams. Complex tasks such as object recognition, behavioral analysis, and video summarization can now be performed with minimal latency. Join us on the exciting journey to achieving synergy between live streaming, blockchain, and AI.
                  "
                />
              </div>
              <Row>
                <Col md={6} className="colbox">
                  <div className="invest_sec_content">
                    <motion.div
                      initial={{ opacity: 0, y: -45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <Image src={icon1} alt="icon" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: -45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Expanding Market
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: -45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      The global live streaming market size reached USD 87.8 Billion in 2024. Looking forward,{" "}
                      <Link
                        href="https://www.imarcgroup.com/live-streaming-market"
                        target="_blank"
                      >
                        IMARC Group
                      </Link>{" "}
                      expects the market to reach USD 605.2 Billion by 2033, exhibiting a growth rate (CAGR) of 23.93% during 2025-2033.
                    </motion.p>
                  </div>
                </Col>
                {investlist.map((item: any, index: number) => (
                  <Col md={6} key={index} className="colbox">
                    <div className="invest_sec_content">
                      <motion.div
                        initial={{ opacity: 0, y: -45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Image src={item.iconimg} alt="icon" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: -45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: -45 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        {item.text}
                      </motion.p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default WhyInvestSec;
