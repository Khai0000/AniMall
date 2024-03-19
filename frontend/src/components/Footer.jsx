import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer({ footerRef, className }) {
  return (
    <footer ref={footerRef} className={className}>
      <div className="iconContainer">
        <span className="iconCaption">Follow us:</span>
        <InstagramIcon />
        <FacebookIcon />
        <YouTubeIcon />
      </div>

      <div className="ratingContainer">
        <h3>Hey Drop Some Rating to Our Page!</h3>
        <div className="border">
          <textarea placeholder="Leave your text here!"></textarea>
          <div className="buttonContainer">
            <div className="ratingButtonContainer">
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
            </div>
            <button className="submitButton">SUBMIT</button>
          </div>
        </div>
      </div>

      <p>
        <i>AniMall @Copyright</i>2024. All rights reserved. Powered by
        CHINGCHONG.{" "}
      </p>
    </footer>
  );
}

export default Footer;
