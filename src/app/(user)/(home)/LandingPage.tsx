"use client";
import Banner from "./Banner";
import AboutSec from "./AboutSec/AboutSec";
// import LandingContactUs from "./ContactUs/LandingContactUs";
import BackToTop from "@/common/BackToTop/BackToTop";
import "./style.scss";
import TokenSale from "./TokenSale/TokenSale";
import WhitepaperSec from "./WhitepaperSec/WhitepaperSec";
import WhyInvestSec from "./WhyInvestSec/WhyInvestSec";
import RoadmapSec from "./RoadmapSec/RoadmapSec";
import TokenomicsSec from "./TokenomicsSec/TokenomicsSec";
import AppNavbar from "./components/Navbar/AppNavbar";
import Footer from "./components/Footer/Footer";
import { getIsLogin } from "@/common/CommonCookies/Cookies";
import ContactSec from "./ContactSec/ContactSec";

const LandingPage = () => {
  const isLogin = getIsLogin();
  return (
    <>
      <div className="landing_page">
        {!isLogin ? <AppNavbar isLogin={isLogin} /> : null}
        <Banner />
        <TokenSale />
        <AboutSec />
        <WhitepaperSec />
        <WhyInvestSec />
        <RoadmapSec />
        <TokenomicsSec />
        <ContactSec />
        {/* <div className="pb-55">
          <Newsletter />
        </div> */}
        {!isLogin ? <Footer /> : null}
      </div>
    </>
  );
};

export default LandingPage;
