import {useState } from "react";
import "../styles/AdoptionCard.css";
import axios from "axios";
import AdoptFormCheck from "./AdoptFormCheck";
import SuccessMessage from "./SuccessMessage"; 
import AdoptFormUpdate from "./AdoptFormUpdate";

const FormHomeCard = ({ form, index, onPostDelete,update }) => {
  const [showForm, setShowForm] = useState(false); 
  const [message, setMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); 

  const whenReject = async (e) => {
    e.stopPropagation();

    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/adoption/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        setSentMessage('The form is rejected and notified.');
        setMessage(true);
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        setSentMessage('An error occurred while rejecting the form. Please try again later.');
        setMessage(true);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setSentMessage('An error occurred while rejecting the form. Please try again later.');
      setMessage(true);
    }
  };

  const whenApprove = async (e) => {
    e.stopPropagation();

    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/adoption/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        setSentMessage('The form is approved and notified.');
        setMessage(true);
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        setSentMessage('An error occurred while approving the form. Please try again later.');
        setMessage(true);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      setSentMessage('An error occurred while approving the form. Please try again later.');
      setMessage(true);
    }
  };

  const onClose = () => {
    setShowForm(false);
  };

  return (
    <div
      className="cardContainer"
      onClick={() => {
        if (update) {
          setShowUpdateForm(true);
        }else{
          if (!showForm) setShowForm(true);
        }
      }}
    >
      <div className="cardDetails">
        <p className="title">{form.firstName} {form.lastName}</p>
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
      <AdoptFormCheck show={showForm} onClose={onClose} whenApprove={whenApprove} whenReject={whenReject} form={form} />
      <SuccessMessage show={message} onClose={() => { setMessage(false); setShowForm(false); onPostDelete(form._id);}} message={sentMessage}></SuccessMessage>
      <AdoptFormUpdate show={showUpdateForm} onClose={() => { setMessage(false); setShowForm(false);}} form={form} />
    </div>
  );
}

export default FormHomeCard;
