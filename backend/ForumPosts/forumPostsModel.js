import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
      // default: [],
    },
    tag: {
      type: [String],
      required: true,
      // default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    peopleWhoLikes: {
      type: [String],
      default: [],
    },
    peopleWhoDislikes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ForumPostModel = mongoose.model("ForumPosts", forumPostSchema);
