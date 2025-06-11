"use client";
import Image from "next/image";
import "./LoginSidebar.scss";
import logo from "../../../../../public/logo_main.svg";
import { useRouter } from "next/navigation";
import { IMAGES } from "@/lib/images.s3";
import { S3_URL } from "@/constants";

const LoginSidebar = () => {
  const router = useRouter();
  const handlePushToHome = () => {
    router.push("/");
  };
  return (
    <>
      <div className="login_sidebar text-center">
        <Image
          className="logo"
          src={logo}
          alt="logo"
          onClick={handlePushToHome}
        />
        <h1>
        <strong>Benefit from the Future of Live Streaming</strong>
        </h1>
        <div className="login_sidebar_animate">
          <img
            className="login_sidebar_img"
            src={S3_URL + IMAGES.login_sidebar_banner}
            alt="img"
          />
          <div className="login_sidebar_animationImg">
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
      </div>
    </>
  );
};

export default LoginSidebar;
