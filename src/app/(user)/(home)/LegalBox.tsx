"use client"
import React from 'react'
import { Col } from 'react-bootstrap'
import { motion } from 'framer-motion'

function LegalBox(props: any) {
  return (
    <Col md="6" lg="3">
      <motion.div
        initial={{ opacity: 0, y: -45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="legalbox"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="img_box"
        >
          <img src={props?.avtar} alt="icon" />
        </motion.div>
        <motion.h6
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {props?.heading}
        </motion.h6>
        <motion.p
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {props?.content}
        </motion.p>
      </motion.div>
    </Col>
  )
}

export default LegalBox
