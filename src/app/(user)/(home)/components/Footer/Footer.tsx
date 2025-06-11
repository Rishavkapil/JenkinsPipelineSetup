"use client";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../../../../../public/logo_main.svg";
import "./Footer.scss";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  UpArrowIcon,
} from "@/app/_ui/svg/_svg";
// import Newsletter from "../Newsletter/Newsletter";
import { Link as NavLink } from "react-scroll";
import { useState } from "react";
import { getIsLogin } from "../../../../../common/CommonCookies/Cookies";

const Footer = () => {
  const isLogin = getIsLogin();
  const [menuOpen, setMenuOpen] = useState(false);
  const fullDate = new Date();
  let year = fullDate?.getFullYear();
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const publicLinks = [
    {
      name: "Home",
      path: "ICO",
    },
    {
      name: "About",
      path: "about",
    },
    {
      name: "Highlights",
      path: "highlights",
    },
    {
      name: "Roadmap",
      path: "Roadmap",
    },
    {
      name: "Tokenomics",
      path: "Tokenomics",
    },
    {
      name: "Contact Us",
      path: "Contact",
    },
  ];

  const scrolltop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer className="Common_footer">
        {/* <Newsletter /> */}
        <Container>
          <div className="inner_footer">
            {isLogin ? null : (
              <div className="inner_footer_upper">
                <Row className="align-items-center">
                  <Col xs={12} sm={4} md={3}>
                    <div className="upper_left">
                      <Image src={logo} alt="" onClick={scrolltop} />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={9}>
                    <div className="upper_right">
                      <ul>
                        {publicLinks.map((item, index) => (
                          <li key={index}>
                            <NavLink
                              activeClass="active"
                              duration={500}
                              to={item.path}
                              spy={true}
                              offset={-100}
                              onClick={handleMenu}
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
            <div className="inner_footer_middle">
              <button type="button" onClick={scrolltop}>
                <UpArrowIcon />
              </button>
            </div>
            <div className="inner_footer_bottom">
              <Row className="align-items-center">
                <Col lg={6} md={6} sm={6} className="order-sm-last">
                  <div className="bottom_right">
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/ozolio/"
                          target="_blank"
                        >
                          <FacebookIcon />
                        </a>
                      </li>
                      <li>
                        <a href="https://t.me/ozolio" target="_blank">
                          <TelegramIcon />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/ozoliolivestream/"
                          target="_blank"
                        >
                          <InstagramIcon />
                        </a>
                      </li>
                      <li>
                        <a href="https://x.com/ozoliorelay" target="_blank">
                          <TwitterIcon />
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <div className="bottom_left">
                    <p>© {year} - All rights reserved.</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
