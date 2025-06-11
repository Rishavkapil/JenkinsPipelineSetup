import React, { ReactNode, useEffect, useRef } from 'react'
import { animate, motion, useInView } from "framer-motion";
import './LandingTitle.scss'

const LandingTitle = ({ title, className, children, Info }: { title?: string, children?: ReactNode, className?: string,Info?:string }) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref);
    useEffect(() => {
        if (isInView) {
            animate(ref.current || "", {
                opacity: [0, 1],
                filter: ["blur(10px)", "blur(0px)"]
            }, { duration: 0.8, })
        }
    }, [isInView])
  return (
    <div className='main_title'>
      <motion.h2 ref={ref} style={{}} title={title} className={`title ${className || ''}`}>
        {title || children}
      </motion.h2>
      {Info && <motion.p ref={ref}>{Info}</motion.p>}
    </div>
  )
}

export default LandingTitle
