"use client";
import Container from "react-bootstrap/Container";
import { ArrowIcon } from "../../_ui/svg/_svg";
import { motion } from "framer-motion";
import { Button } from "@/common";
import { IMAGES } from "@/lib/images.s3";
import { getIsLogin } from "@/common/CommonCookies/Cookies";
import { useRouter } from "next/navigation";
import { S3_URL } from "@/constants";
import { useState } from "react";
import SigninModal from "../_Components/SigninModal/SigninModal";

const Banner = () => {
  const isLogin = getIsLogin();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const handleCloseModal = () => {
    setModalShow(!modalShow)
  }

  // const handleInvest = () => {
  //   if (isLogin) {
  //     router.push("/wallets");
  //   } else {
  //     router.push("/sign-in");
  //   }
  // };

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
      script.remove();
    };

    document.body.appendChild(script);
  };
  return (
    <section className="bannerMain">
      <Container id="ICO" className="bannerBox">
        <div className="bannerMain_video">
          <img
            className="d-none d-md-block"
            src={S3_URL + IMAGES.bannerimg}
            alt="img"
          />
          <img
            className="d-block d-md-none"
            src={S3_URL + IMAGES.banner_mobileimg}
            alt="img"
          />
          <div className="bannerMain_video_animation">
            <img
              className="live_stream"
              src={S3_URL + IMAGES.live_streamgraphic_01}
              alt="img"
            />
            <img
              className="repost_img"
              src={S3_URL + IMAGES.camera_img}
              alt="img"
            />
          </div>
        </div>
        <div className="bannerMain_content text-center">
          <motion.h1
            initial={{ opacity: 0, y: -45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Benefit from the Future of Live Streaming
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Receive maximum value and quantifiable benefits from the growing intelligent technology
          </motion.p>
          <Button
            className="orange-btn right_icon_btn"
            text="Buy Ozolio Token"
            rightIcon={<ArrowIcon />}
            onClick={() => { handleClick(); setModalShow(!modalShow) }}
          // onClick={handleInvest}
          />
        </div>
      </Container>
      <SigninModal handleClose={handleCloseModal} show={modalShow} />
    </section>
  );
};
export default Banner;
