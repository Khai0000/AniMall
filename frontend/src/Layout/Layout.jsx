import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import AdvPopUp from "../shumin/components/AdvPopUp"; // Import AdvPopUp
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const [isFooterIntersecting, setIsFooterIntersecting] = useState(false);
  const footerRef = useRef(null);
  const [spacing, setSpacing] = useState(0);

  const location = useLocation();
  const bodyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-100px 0px 0px 0px" } // Adjust rootMargin as needed
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateSpacerHeight = () => {
      const headerElement = document.querySelector('header');
      const mainElement = document.querySelector('main');
      
      if (!headerElement || !mainElement) return;

      const headerHeight = headerElement.clientHeight;
      const mainHeight = mainElement.clientHeight;
      const totalHeight = window.innerHeight;

      let spacerHeight = 0;

      if (mainHeight + headerHeight < totalHeight) {
        spacerHeight = totalHeight - mainHeight - headerHeight;
      }

      setSpacing(spacerHeight);
    };

    calculateSpacerHeight();

    const headerElement = document.querySelector('header');
    const mainElement = document.querySelector('main');
    
    const resizeObserver = new ResizeObserver(() => {
      calculateSpacerHeight();
    });

    if (headerElement) {
      resizeObserver.observe(headerElement);
    }
    if (mainElement) {
      resizeObserver.observe(mainElement);
    }

    return () => {
      if (headerElement) {
        resizeObserver.unobserve(headerElement);
      }
      if (mainElement) {
        resizeObserver.unobserve(mainElement);
      }
    };
  }, [location]);

  return (
    <div className="App">
      <Header />
      <main ref={bodyRef}>
        <Outlet />
      </main>
      <div style={{ height: spacing }}></div>
      <Footer
        footerRef={footerRef}
        className={isFooterIntersecting ? "reveal" : ""}
      />
    </div>
  );
}

export default Layout;
