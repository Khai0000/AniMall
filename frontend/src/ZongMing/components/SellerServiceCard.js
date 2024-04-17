import { useState, useEffect } from "react";
import "../styles/SellerServiceCard.css";
import SellerServiceCardSkeleton from "./SellerServiceCardSkeleton";
import { useDispatch } from "react-redux";
import {
  removeService,
  hideService,
} from "../slices/serviceSlice";
import { Link } from "react-router-dom";

const SellerServiceCard = ({service}) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(service.hidden);
  const [quantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (service.serviceImages && service.serviceImages.length > 0) {
    //   const firstImage = service.serviceImages[0];
    //   if (firstImage.includes("jpg")) {
    //     let imageDir = firstImage.substring(0, firstImage.indexOf("."));
    //     import(`../assets/image/${imageDir}.jpg`)
    //       .then((image) => {
    //         setImage(image.default);
    //       })
    //       .catch((error) => {
    //         console.error("Error loading image:", error);
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //       });
    //   } else {
    //     // If the image URL does not contain "jpg", assume it's a direct URL
    //     setImage(firstImage);
    //     setIsLoading(false);
    //   }
    // } else {
    //   // Handle the case where serviceImages is empty or undefined
    //   console.error(
    //     "Service image is not defined or not in the expected format:",
    //     service
    //   );
    //   setIsLoading(false);
    // }
    if (service.serviceImages && service.serviceImages[0]) {
      if (service.serviceImages[0].includes("jpg")) {
        
        let filename = service.serviceImages[0].split("/").pop();
       
        let imageName = filename.split(".")[0] + ".jpg";
        import(`../assets/image/${imageName}`)
          .then((image) => {
            setImage(image.default);
          })
          .catch((error) => {
            console.error("Error loading image:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        
        console.error(
          "Service image is not in the expected format:",
          service.serviceImages[0]
        );
        setIsLoading(false);
      }
    }
  }, [service]);

  const handleOnRemoveClicked = () => {
    dispatch(removeService(service.serviceTitle));
  };

  const handleCheckboxClick = () => {
    setIsHidden(!isHidden);
    dispatch(
      hideService({
        serviceTitle: service.serviceTitle,
      })
    );
  };

  return isLoading ? (
    <SellerServiceCardSkeleton />
  ) : (
    <div>
      <div className="seller-service-card-container">
        <button
          className={`seller-service-card-checkbox${
            !isHidden ? "-clicked" : "-unclicked"
          }`}
          onClick={handleCheckboxClick}
        >
          {!isHidden ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="0.5"
                y="-0.5"
                width="27"
                height="27"
                rx="8.5"
                transform="matrix(1 0 0 -1 0 27)"
                fill="#F3B801"
                stroke="#F3B801"
              />
              <path
                d="M23 8.57271L9.97143 21.9574L4 15.8228L5.53086 14.2501L9.97143 18.8009L21.4691 7L23 8.57271Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="0.5"
                y="-0.5"
                width="27"
                height="27"
                rx="8.5"
                transform="matrix(1 0 0 -1 0 27)"
                fill="white"
                stroke="#3C95A9"
              />
            </svg>
          )}
        </button>
        <img src={image} alt="" className="seller-service-card-image" />
        <Link
          to={`add-service/${service.serviceTitle}`}
          className="seller-service-card-product-name"
          style={{ textDecoration: "none" }}
        >
          <h4 className="seller-service-card-product-name-content">
            {service.serviceTitle}
          </h4>
        </Link>

       
        <button
          className="seller-service-card-minus-button"
          disabled
        >
          -
        </button>
        <input
          type="number"
          className="seller-service-card-quantity-input-zm"
          value={quantity}
          readOnly 
        />
        <button
          className="seller-service-card-plus-button"
          disabled
        >
          +
        </button>
    

        <h4 className="seller-service-card-price">{service.price}</h4>
        <button
          className="seller-service-card-remove-button"
          onClick={handleOnRemoveClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 56 56"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M33.9062 6.62107C39.4881 11.4467 44.5208 16.8736 48.9126 22.8029C51.3405 26.0892 51.2274 30.662 48.5686 33.7774C43.7153 39.4646 38.2147 44.5656 32.1783 48.9771C28.8716 51.3938 24.3033 51.1625 21.209 48.494C15.627 43.6685 10.5943 38.2416 6.20265 32.3122C3.77469 29.0259 3.88784 24.4531 6.5466 21.3377C11.3994 15.651 16.8994 10.5506 22.9352 6.13959C24.5481 4.97248 26.5088 4.385 28.4995 4.47237C30.4902 4.55973 32.3942 5.31683 33.9029 6.62094M36.2213 19.5232C36.5419 19.869 36.7123 20.3277 36.6949 20.7985C36.6776 21.2693 36.4739 21.7136 36.1288 22.0337L30.0679 27.6543L35.6981 33.7255C36.0187 34.0713 36.1891 34.53 36.1717 35.0008C36.1544 35.4716 35.9507 35.9159 35.6056 36.2359C35.2604 36.556 34.8021 36.7256 34.3313 36.7075C33.8605 36.6894 33.4159 36.4849 33.0953 36.1392L27.4651 30.068L21.4042 35.6886C21.0591 36.0087 20.6007 36.1783 20.1299 36.1602C19.6592 36.142 19.2146 35.9376 18.894 35.5919C18.5733 35.2461 18.403 34.7874 18.4203 34.3166C18.4376 33.8458 18.6413 33.4015 18.9864 33.0815L25.0473 27.4608L19.4171 21.3896C19.0965 21.0439 18.9261 20.5851 18.9435 20.1143C18.9608 19.6435 19.1645 19.1992 19.5096 18.8792C19.8548 18.5591 20.3131 18.3895 20.7839 18.4076C21.2547 18.4258 21.6993 18.6302 22.0199 18.9759L27.6501 25.0471L33.711 19.4265C34.0561 19.1064 34.5145 18.9368 34.9853 18.9549C35.456 18.9731 35.9006 19.1775 36.2213 19.5232Z"
              fill="#FE3D00"
            />
          </svg>
        </button>
      </div>
      <svg height="50" id="horizontal-line">
        <line
          x1="0"
          y1="25"
          x2="100%"
          y2="25"
          stroke="#3C95A9"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default SellerServiceCard;
