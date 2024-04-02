import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

function Layout() {
  const [isFooterIntersecting, setIsFooterIntersecting] = useState(false);
  const footerRef = useRef(null);
  const [spacing,setSpacing]=useState(0);

  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-100px 0px 0px 0px" } // Adjust rootMargin as needed
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateSpacerHeight = () => {
      const headerHeight = document.querySelector('header').clientHeight;
      const outletHeight = document.querySelector('main').clientHeight;
      const totalHeight = window.innerHeight;

      let spacerHeight = 0;

      if (outletHeight + headerHeight < totalHeight) {
        spacerHeight = totalHeight - outletHeight - headerHeight;
        setSpacing(spacerHeight);
      }
    };

    calculateSpacerHeight();
  },[location]);

  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <div style={{height:spacing}}></div>
      <Footer
        footerRef={footerRef}
        className={isFooterIntersecting ? "reveal" : ""}
      />
    </div>
  );
}

export default Layout;
