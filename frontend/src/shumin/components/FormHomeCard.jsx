import { useState } from "react";
import "../styles/AdoptionCard.css";
import axios from "axios";
import AdoptFormCheck from "./AdoptFormCheck";
import SuccessMessage from "./SuccessMessage";
import AdoptFormUpdate from "./AdoptFormUpdate";

const FormHomeCard = ({ form, onPostDelete, update }) => {
  const [message, setMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);
  const [showAdoptFormCheck, setShowAdoptFormCheck] = useState(false);

  const whenReject = async (e) => {
    setShowAdoptFormCheck(false);
    e.stopPropagation();
    try {
      setSentMessage("Loading ...");
      setMessage(true);
      const response = await axios.post(
        `http://localhost:4000/api/reminders//adoptionemail`,
        {
          email: form.email,
          message:
            "Thank you for your kindness.We regret to inform you that your adoption application is has not been successful.",
        }
      );
      if (
        response.status === 200 &&
        response.data.message === "Email sent successfully"
      ) {
        console.log(`Rejection sent successfully.`);
        setMessage(false);
      } else {
        console.error(`Failed to reject.`);
        setMessage(false);
      }
    } catch (error) {
      console.error(`Failed to reject:`, error);
      setMessage(false);
    }

    try {
      // Delete the post
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/adoption/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        setSentMessage("The form is rejected and notified.");
        setMessage(true);
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        setSentMessage(
          "An error occurred while rejecting the form. Please try again later."
        );
        setMessage(true);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setSentMessage(
        "An error occurred while rejecting the form. Please try again later."
      );
      setMessage(true);
    }
  };

  const whenApprove = async (e) => {
    setShowAdoptFormCheck(false);
    e.stopPropagation();

    try {
      setSentMessage("Loading ...");
      setMessage(true);
      const response = await axios.post(
        `http://localhost:4000/api/reminders//adoptionemail`,
        {
          email: form.email,
          message:
            "Thank you for your kindness.We are happy to inform you that your adoption application is has been successful.Kindly come to our shop for further action as soon as possible.",
        }
      );
      if (
        response.status === 200 &&
        response.data.message === "Email sent successfully"
      ) {
        console.log(`Approval sent successfully.`);
        sentMessage(false);
      } else {
        console.error(`Failed to approve.`);
        setMessage(false);
      }
    } catch (error) {
      console.error(`Failed to approve:`, error);
      setMessage(false);
    }

    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/adoption/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        setSentMessage("The form is approved and notified.");
        setMessage(true);
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        setSentMessage(
          "An error1 occurred while approving the form. Please try again later."
        );
        setMessage(true);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setSentMessage(
        "An error2 occurred while approving the form. Please try again later."
      );
      setMessage(true);
    }
  };

  return (
    <div
      className="cardContainer sx-cardContainer"
      onClick={() => {
        if (update) {
          setShowUpdateForm(true);
        } else {
          setShowAdoptFormCheck(true);
        }
      }}
    >
      <div className="cardDetails">
        <p className="title">
          {form.firstName} {form.lastName}
        </p>
        <div className="detailsRow">
          <p className="author">
            email: <span className="details">{form.email}</span>
          </p>
          <p className="author">
            phone: <span className="details">{form.phone}</span>
          </p>
          <p className="author">
            salary: <span className="details">{form.salary}</span>
          </p>
        </div>
      </div>
      {showAdoptFormCheck && (
        <AdoptFormCheck
          showAdoptFormCheck={showAdoptFormCheck}
          setShowAdoptFormCheck={setShowAdoptFormCheck}
          whenApprove={whenApprove}
          whenReject={whenReject}
          form={form}
        />
      )}
      <AdoptFormUpdate
        show={showUpdateForm}
        onClose={() => {
          setShowUpdateForm(false);
          console.log("Clicked");
          console.log(showUpdateForm);
        }}
        form={form}
      />
      <SuccessMessage
        show={message}
        onClose={() => {
          setMessage(false);
          setShowUpdateForm(false);
          onPostDelete(form._id);
        }}
        message={sentMessage}
      ></SuccessMessage>
    </div>
  );
};

export default FormHomeCard;
