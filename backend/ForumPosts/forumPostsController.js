import mongoose from "mongoose";
import { ForumPostModel } from "../ForumPosts/forumPostsModel.js";

export const getAllForumPosts = async (req, res) => {
  try {
    const response = await ForumPostModel.find().sort({ createdAt: -1 });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addOneForumPost = async (req, res) => {
  const { title, author, content, image, tag } = req.body;
  console.log(req.body);
  try {
    const newPost = await ForumPostModel.create({
      title,
      author,
      content,
      image,
      tag,
    });
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Workout id" });

  try {
    const response = await ForumPostModel.findById({ _id: id });

    if (!response)
      return res.status(404).json({ error: "The post is not found" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Delete the post
    const postToDelete = await ForumPostModel.findByIdAndDelete(id);
    if (!postToDelete) {
      return res.status(404).json({ error: "The post to delete is not found" });
    }

    // Step 2: Retrieve image URLs
    const imageUrls = postToDelete.image;

    // Step 3: Delete images
    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        const imageFileName = imageUrl.split("/").pop();
        const deleteImageResponse = await fetch(
          `http://localhost:4000/image/${imageFileName}`,
          { method: "DELETE" }
        );
        if (!deleteImageResponse.ok) {
          console.error(
            `Failed to delete image ${imageFileName}:`,
            await deleteImageResponse.text()
          );
        }
      })
    );

    return res
      .status(200)
      .json({ message: "Post and related photos deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  try {
    const postToUpdate = await ForumPostModel.findById({ _id: id });
    if (!postToUpdate) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = { name, content };
    postToUpdate.comments.push(newComment);
    await postToUpdate.save();

    const addedComment = postToUpdate.comments.find(
      (comment) => comment.name === name && comment.content === content
    );

    return res.status(201).json(addedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const postToDeleteComment = await ForumPostModel.findById({ _id: postId });

    if (!postToDeleteComment) {
      return res.status(404).json({ error: "Post not found" });
    }

    postToDeleteComment.comments.pull({ _id: commentId });

    await postToDeleteComment.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const postToUpdate = await ForumPostModel.findById({ _id: postId });
    if (!postToUpdate) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { userUid } = req.body;

    if (!postToUpdate.peopleWhoLikes.includes(userUid)) {
      postToUpdate.peopleWhoLikes.push(userUid);
      postToUpdate.likes += 1;

      if (postToUpdate.peopleWhoDislikes.includes(userUid)) {
        postToUpdate.peopleWhoDislikes = postToUpdate.peopleWhoDislikes.filter(
          (uid) => uid !== userUid
        );
        postToUpdate.dislikes -= 1;
      }
      await postToUpdate.save();
      return res.status(200).json(postToUpdate);
    } else {
      return res.status(400).json({ error: "User already liked this post" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const dislikePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const postToUpdate = await ForumPostModel.findById(postId);

    if (!postToUpdate) {
      return res.status(404).json({ error: "Post not found" });
    }

    const { userUid } = req.body;

    if (!postToUpdate.peopleWhoDislikes.includes(userUid)) {
      postToUpdate.peopleWhoDislikes.push(userUid);
      postToUpdate.dislikes += 1;

      if (postToUpdate.peopleWhoLikes.includes(userUid)) {
        postToUpdate.peopleWhoLikes = postToUpdate.peopleWhoLikes.filter(
          (uid) => uid !== userUid
        );
        postToUpdate.likes -= 1;
      }

      await postToUpdate.save();

      return res
        .status(200)
        .json({ message: "Post disliked successfully", post: postToUpdate });
    } else {
      return res.status(400).json({ error: "User already disliked this post" });
    }
  } catch (error) {
    console.error("Error disliking post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeReaction = async (req, res) => {
  const { postId } = req.params;
  const { userUid } = req.body;

  try {
    const postToUpdate = await ForumPostModel.findById(postId);

    if (!postToUpdate) {
      return res.status(404).json({ error: "Post not found" });
    }

    let updated = false;

    if (postToUpdate.peopleWhoDislikes.includes(userUid)) {
      postToUpdate.peopleWhoDislikes = postToUpdate.peopleWhoDislikes.filter(
        (uid) => uid !== userUid
      );
      postToUpdate.dislikes -= 1;
      updated = true;
    }

    if (postToUpdate.peopleWhoLikes.includes(userUid)) {
      postToUpdate.peopleWhoLikes = postToUpdate.peopleWhoLikes.filter(
        (uid) => uid !== userUid
      );
      postToUpdate.likes -= 1;
      updated = true;
    }

    if (!updated) {
      return res.status(400).json({ error: "User has not reacted to this post" });
    }

    await postToUpdate.save();

    return res.status(200).json({ message: "Reaction removed successfully", post: postToUpdate });
  } catch (error) {
    console.error("Error removing reaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
