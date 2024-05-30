import "../styles/AdoptFormCheck.css";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
//import { setInitialPost } from '../redux/actions'; // Adjust the import path according to your project structure

function AdoptFormCheck({ show, onClose, whenApprove, whenReject }) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const formRef = useRef(form);
  formRef.current = form;
  let forms = formRef.current;

  // useEffect(() => {
  //   const getFormPosts = async () => {
  //     try {
  //       const formPostsResponse = await axios.get(
  //         `http://localhost:4000/api/pet/post/${form._id}`
  //       );
  //       if (formPostsResponse.status === 200) {
  //         dispatch(setInitialPost(formPostsResponse.data));
  //       } else {
  //         console.log(formPostsResponse);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching form posts:", error);
  //     }
  //   };

  //   if (!form) {
  //     getFormPosts();
  //   }
  // }, [dispatch, form]);

  useEffect(() => {
    const fetchSpecificPost = async () => {
      try {
        if (!formRef.current) {
          const specificPostResponse = await axios.get(
            `http://localhost:4000/api/pet/post/${form._id}`
          );

          if (specificPostResponse.status === 200) {
            formRef.current = specificPostResponse.data;
          } else {
            throw new Error({ error: "Form not found" });
          }
        } else {
          console.log("Error happen")
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } 
    };
    fetchSpecificPost();
  });

  return (
    <div className="adoption-form-container" style={{ display: show ? 'block' : 'none' }}>
      <div className="adoption-form-dialog">
        <div className="terms-and-conditions">
          <h3>Terms & Conditions</h3>
          <p>
            a. By clicking the submit button, I agree to go adoption process, will undergo a homecheck, and interview.<br /><br />
            b. By clicking the submit button, I understand my references will be checked including veterinary and personal. <br /><br />
            c. By clicking the submit button, I understand there is no "cooling off" period, and that if I no longer want or can no longer care for my adopted pet, I agree to notify Animall. BY EMAIL and provide a 14 day period to allow Animall to make arrangements for my pet to be taken back into rescue.<br /><br />
            d. By clicking the submit button, I agree to indemnify and hold harmless the Animall against any losses, lawsuits, claims, injury, damages incurred by me or to any persons or property by my adopted pet, once adoption has been completed.<br /><br />
            e. By clicking the submit button, I understand that Animall will disclose any of the pet's health or behavior issues known by the above named Animall before adoption is completed.<br /><br />
            f. By clicking the submit button, I promise I will send non-repetitive 1 photos and a short video of adopted pet with at least 15 seconds to Animall once a week to Animall after the adoption is completed.<br /><br />
            g. By clicking the submit button, I understand that if I no longer want my pet, or am no longer able to care for my adopted pet, I will be directed to surrender my pet to Animall and provide transport to where Animall deems appropriate.<br /><br />
            h. By clicking the submit button, I verify all of the above information is true and accurate.
          </p>
        </div>

        <form className="adoption-form">
          <h2>Pet Adoption Form</h2>
          <input
            type="text"
            name="firstName"
            placeholder={forms && forms.firstName}
            value={forms ? forms.firstName : ''}
            readOnly
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={forms && forms.lastName}
            value={forms ? forms.lastName : ''}
            readOnly
            required
          />
          <input
            type="email"
            name="email"
            placeholder={forms && forms.email}
            value={forms ? forms.email : ''}
            readOnly
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={forms && forms.phone}
            value={forms ? forms.phone : ''}
            readOnly
            required
          />
          <input
            name="address"
            placeholder={forms && forms.address}
            value={forms ? forms.address : ''}
            readOnly
            required
          ></input>
          <input
            type="text"
            name="city"
            placeholder={forms && forms.city}
            value={forms ? forms.city : ''}
            readOnly
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder={forms && forms.postalCode}
            value={forms ? forms.postalCode : ''}
            readOnly
            required
          />
          <input
            type="number"
            name="salary"
            placeholder={forms && forms.salary}
            value={forms ? forms.salary : ''}
            readOnly
            required
          />
          <input
            type="number"
            name="petnum"
            placeholder={forms && forms.petnum}
            value={forms ? forms.petnum : ''}
            readOnly
            required
          />
          <div className="button-container">
            <button type="button" className="ApprovedButton" onClick={whenApprove}>Approve</button>
            <button type="button" className="RejectedButton" onClick={whenReject}>Reject</button>
          </div>
          <button type="button" className="sx-closeButton" onClick={onClose}>
            <CloseIcon className="sx-closeIcon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdoptFormCheck;
