"use client"
import React, { useState, useEffect } from "react";

function BackToTop(): JSX.Element {
  const [showButton, setShowButton] = useState<any>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Return a cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          &#8679;
        </button>
      )}
    </>
  );
}

export default BackToTop;
