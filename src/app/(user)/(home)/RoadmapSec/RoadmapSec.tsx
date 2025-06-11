import { Container } from "react-bootstrap"
import "./RoadmapSec.scss"
import CommonHeading from "@/common/CommonHeading/CommonHeading"
import { motion } from "framer-motion";

const RoadmapSec = () => {
  return (
    <>
      <section className="roadmap_sec py-100" id="Roadmap">
        <Container>
          <div className="same_content_sec text-center mw-100">
            <div data-text="Roadmap" className="stroke_text"></div>
            <CommonHeading
              heading="Roadmap"
            />
          </div>
          <div className="roadmap_sec_content">
            <div className="roadmap_desktop_view">
              <div className="d-flex flex-wrap">
                <div className="roadmap_item roadmap_item_first">
                  <h3 className="roadmap_year text-sm-center">2025</h3>
                  <ul>
                    <li>
                      <h3>Q2</h3>
                    </li>
                    <li>
                      <h3>Q3</h3>
                    </li>
                    <li>
                      <h3>Q4</h3>
                    </li>
                  </ul>
                </div>
                <div className="roadmap_item roadmap_item_middle">
                  <h3 className="roadmap_year text-sm-center">2026</h3>
                  <ul>
                    <li>
                      <h3>Q1</h3>
                    </li>
                    <li>
                      <h3>Q2</h3>
                    </li>
                    <li>
                      <h3>Q3</h3>
                    </li>
                    <li>
                      <h3>Q4</h3>
                    </li>
                  </ul>
                </div>
                <div className="roadmap_item roadmap_item_last">
                  <h3 className="roadmap_year text-sm-center">2027</h3>
                  <ul>
                    <li>
                      <h3>Q1</h3>
                    </li>
                    <li>
                      <h3>Q2</h3>
                    </li>
                    <li>
                      <h3>Q3</h3>
                    </li>
                    {/* <li>
                      <h3>Q4</h3>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="roadmap_data">
                <div className="roadmap_data_item">
                  <motion.div
                    className="roadmap_data_item_1 boxsize green_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p>Switch to crypto-friendly business logic.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_2 boxsize blue_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  >
                    <p>Develop an initial structure for token holders.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_3 boxsize yellow_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p>Develop a real-time video-processing core.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_4 boxsize dark_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  >
                    <p>Build a real-time video-processing cluster.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_5 boxsize blue_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p>Develop APIaaS portal and development APIs.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_6 boxsize green_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                  >
                    <p>Design and produce proprietary hardware.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_7 boxsize yellow_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <p>Transform the ecosystem into Universal PaaS.</p>
                  </motion.div>
                  <motion.div
                    className="roadmap_data_item_8 boxsize dark_bg"
                    initial={{ opacity: 0, y: -45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                  >
                    <p>Assume a leading position in the market.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default RoadmapSec
