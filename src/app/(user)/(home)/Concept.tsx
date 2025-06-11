import React from "react";
import { Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Image from "next/image";

function Concept(props: any) {
  return (
    <Col md="6" lg="4">
      <div className="concept_box">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="img_box"
        >
          <Image src={props?.avtar} alt="icon" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {props?.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {props?.content}
        </motion.p>
      </div>
    </Col>
  );
}

export default Concept;
