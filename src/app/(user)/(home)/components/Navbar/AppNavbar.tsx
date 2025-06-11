"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Link as NavLink } from "react-scroll";
import Image from "next/image";
import { Container } from "react-bootstrap";
import logo from "../../../../../../public/logo_main.svg";
import { usePathname, useRouter } from "next/navigation";
import "./header.scss";
import { Button } from "@/common";
import LogoutModal from "../LogoutModal/logoutModal";
import { MenuCloseIcon, MenuIcon } from "@/app/_ui/svg/_svg";
import SigninModal from "@/app/(user)/_Components/SigninModal/SigninModal";

declare global {
  interface Window {
    BMDataLayer: any[];
  }
}

const AppNavbar = ({
  isLogin,
  className,
  isPublic,
  isPrivate,
}: {
  isLogin: string | undefined;
  className?: string;
  isPublic?: boolean;
  isPrivate?: boolean;
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleCloseModal = () => {
    setModalShow(!modalShow)
  }

  const router = useRouter();
  const pathname = usePathname();
  const url = pathname?.split("/");
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

  const privateLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Orders",
      path: "/order-details",
    },
    {
      name: "Wallets",
      path: "/wallets",
    },
    {
      name: "KYC",
      path: "/kyc-details",
    },
    {
      name: "Contact Us",
      path: "/contact",
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  }, []);

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
      console.error("Failed to load tracking script");
      script.remove();
    };

    document.body.appendChild(script);
  };
  return (
    <>
      <header
        className={`header ${scroll ? "header__scrolled" : ""} ${className ? className : ""
          }`}
      >
        <Container>
          <Link href="/" className="header__logo">
            <Image src={logo} alt="logo" className="" />
            {/* <Image src={mobLogo} alt="mob-logo" className="d-md-none d-block" /> */}
          </Link>
          <div className="header__right">
            <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
              <ul className={`header__links `}>
                {isLogin ? (
                  <>
                    {privateLinks.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.path}
                          onClick={handleMenu}
                          className={
                            item?.path === `/${url[1]}` ? "active" : ""
                          }
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {publicLinks.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          activeClass="active"
                          duration={500}
                          to={item.path}
                          spy={true}
                          offset={-300}
                          onClick={handleMenu}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              <button
                className="mob-menu__close d-block d-lg-none"
                onClick={handleMenu}
              >
                <MenuCloseIcon />
              </button>
            </div>
          </div>

          <div className="header__actions">
            {isLogin ? (
              <Button
                className="btn-style"
                text="Signout"
                onClick={handleShow}
              />
            ) : (
              <Button
                className="btn-style"
                text="Sign In"
                onClick={() => { handleClick(); setModalShow(!modalShow) }}
              // onClick={() => router.push("/sign-in")}
              />
            )}
            <button
              className="d-block d-lg-none mob-menu-btn"
              onClick={handleMenu}
            >
              <MenuIcon />
              {/* <span></span> */}
            </button>
          </div>
        </Container>
      </header>
      <LogoutModal handleClose={handleClose} show={show} />
      <SigninModal handleClose={handleCloseModal} show={modalShow} />
    </>
  );
};

export default AppNavbar;
