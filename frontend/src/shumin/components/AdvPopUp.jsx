import "../styles/AdvPopUp.css";
import CloseIcon from "@mui/icons-material/Close";
import adv1 from "../assets/images/adv1.jpg";
import adv2 from "../assets/images/adv2.jpg";
import adv3 from "../assets/images/adv3.jpg";
import adv4 from "../assets/images/adv4.jpg";

function AdvPopUp({ show, onClose }) {  // Assuming show and onClose are passed as props

  const images = [adv1, adv2, adv3,adv4];
  // Generate a random index based on the length of the images array
  const randomIndex = Math.floor(Math.random() * images.length);

  // Select an image at the random index
  const selectedImage = images[randomIndex];



  return (
    <div className="advPopUp" style={{ display: show ? 'block' : 'none' }}>
      <div className="advPopupContainer">
        <div className="advPopupDialog">
          <img src={selectedImage} alt="Advertisement"/>
          <button className="sx-closeButton" onClick={onClose}><CloseIcon className="sx-closeIcon" /></button>
        </div>
      </div>
    </div>
  );
}

export default AdvPopUp;
