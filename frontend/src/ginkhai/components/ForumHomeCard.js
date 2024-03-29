import { useState, useEffect } from "react";
import "../styles/ForumHomeCard.css";

const ForumHomeCard = ({ post }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    import(`../assets/images/${post.image}.jpg`).then((image) => {
      setImage(image.default);
    });
  }, [post]);

  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={image} alt="cover" />
      </div>

      <div className="cardDetails">
        <p className="title">{post.title}</p>
        <p className="author">
          By: <span className="authorDetails">{post.author}</span>
        </p>
        <p className="content">{post.content}</p>
      </div>
    </div>
  );
};

export default ForumHomeCard;
