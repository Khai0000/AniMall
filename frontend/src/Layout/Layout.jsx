import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from 'react-router-dom'
import '../styles/Layout.css'

function Layout() {
  const [isFooterIntersecting, setIsFooterIntersecting] = useState(false);
  const footerRef = useRef(null);

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

  return (
    <div className="App">
      <Header />
      <main >
        <Outlet/>
      </main>
      <div className='spacer'></div>
      <div>
        <Footer
          footerRef={footerRef}
          className={isFooterIntersecting ? "reveal" : ""}
        />
      </div>
    </div>
  );
}

export default Layout;
