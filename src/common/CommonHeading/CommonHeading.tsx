import './CommonHeading.scss'
import { ReactNode } from 'react'
import { motion } from "framer-motion";

const CommonHeading = ({ heading, centered, text }: { text?: any | ReactNode; heading?: string | ReactNode; centered?: boolean }) => {
  return (
    <div className={`common_heading ${centered ? 'text-center' : ''}`}>
      <motion.h2
        initial={{ opacity: 0, y: -45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {heading}
      </motion.h2>
      {text &&
        <motion.p
          initial={{ opacity: 0, y: -45 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {text}
        </motion.p>
      }
    </div>
  )
}

export default CommonHeading
