import { createSlice } from "@reduxjs/toolkit";

// template for a post
// {
//   title: "My Experience with Labrador Retriever",
//   author: "John Doe",
//   content:
//     "Labrador Retrievers are known for their friendly and outgoing nature. My Labrador, Max, was no exception. From the moment we brought him home, he filled our lives with joy and laughter. Whether it was playing fetch in the backyard or going for long walks in the park, Max was always by our side. Training him was a rewarding experience, as he was quick to learn new tricks and commands. His loyalty knew no bounds, and he was always there to comfort us during difficult times. Max truly became a cherished member of our family, and I will forever be grateful for the time we spent together.",
//   image: ["dog1.jpg"],
//   tag: ["dog"],
//   likes: 10,
//   dislikes: 0,
//   comments: [
//     {
//       name: "Emma",
//       content: "Great post! Very informative.",
//     },
//     {
//       name: "Liam",
//       content: "I love Labradors! They're the best.",
//     },
//     {
//       name: "Olivia",
//       content: "Such a heartwarming story. Thanks for sharing!",
//     },
//     {
//       name: "Noah",
//       content:
//         "Labradors are amazing companions. Max sounds like a wonderful dog.",
//     },
//     {
//       name: "Ava",
//       content: "Labrador Retrievers are so adorable!",
//     },
//     {
//       name: "William",
//       content: "German Shepherds are such intelligent dogs.",
//     },
//     {
//       name: "Sophia",
//       content: "I had a Golden Retriever too. They're the sweetest dogs.",
//     },
//     {
//       name: "James",
//       content:
//         "Bulldogs have such unique personalities. Bruno sounds like a great dog.",
//     },
//     {
//       name: "Isabella",
//       content: "Poodles are so smart! Lily sounds like a wonderful comp",
//     },
//   ],
//   peopleWhoLikes: [],
//   peopleWhoDislikes: [],
// },

export const postSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    addPost: (state, action) => {
      return [action.payload, ...state];
    },
    removePost: (state, action) => {
      return state.filter((post) => post._id !== action.payload);
    },
    setInitialPost: (state, action) => {
      return [...action.payload];
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const postIndex = state.findIndex((post) => {
        return (
          post._id===postId
        );
      });
      if (postIndex !== -1) {
        state[postIndex].comments.unshift(comment);
      }
    },
    removeComment: (state, action) => {
      const { postId, commentId } = action.payload;
      console.log(postId,commentId);
      const postIndex = state.findIndex((post) => post._id === postId);
      console.log(postIndex);
      if (postIndex !== -1) {
        const post = state[postIndex];
        post.comments = post.comments.filter((comment) => {
          return comment._id !== commentId;
        });
      }

    },
    addLike: (state, action) => {
      const { postTitle, userUid } = action.payload;
      const postIndex = state.findIndex((post) => post.title === postTitle);
      if (postIndex !== -1) {
        const post = state[postIndex];

        post.peopleWhoLikes.push(userUid);
        post.likes += 1;

        if (post.peopleWhoDislikes.includes(userUid)) {
          post.peopleWhoDislikes = post.peopleWhoDislikes.filter(
            (uid) => uid !== userUid
          );
          post.dislikes -= 1;
        }
      }
    },
    addDislike: (state, action) => {
      const { postTitle, userUid } = action.payload;
      const postIndex = state.findIndex((post) => {
        return (
          post.title.trim().toLowerCase() === postTitle.trim().toLowerCase()
        );
      });
      if (postIndex !== -1) {
        const post = state[postIndex];
        post.peopleWhoDislikes.push(userUid);
        post.dislikes += 1;

        if (post.peopleWhoLikes.includes(userUid)) {
          post.peopleWhoLikes = post.peopleWhoLikes.filter(
            (uid) => uid !== userUid
          );
          post.likes -= 1;
        }
      }
    },
    removeLike: (state, action) => {
      const { postTitle, userUid } = action.payload;
      const postIndex = state.findIndex((post) => {
        return (
          post.title.trim().toLowerCase() === postTitle.trim().toLowerCase()
        );
      });
      if (postIndex !== -1) {
        const post = state[postIndex];
        post.peopleWhoLikes = post.peopleWhoLikes.filter(
          (uid) => uid !== userUid
        );
        post.likes -= 1;
      }
    },
    removeDislike: (state, action) => {
      const { postTitle, userUid } = action.payload;
      const postIndex = state.findIndex((post) => {
        return (
          post.title.trim().toLowerCase() === postTitle.trim().toLowerCase()
        );
      });
      if (postIndex !== -1) {
        const post = state[postIndex];
        post.peopleWhoDislikes = post.peopleWhoDislikes.filter(
          (uid) => uid !== userUid
        );
        post.dislikes -= 1;
      }
    },
  },
});

export const {
  addPost,
  removePost,
  setInitialPost,
  addComment,
  addLike,
  addDislike,
  removeLike,
  removeDislike,
  removeComment,
} = postSlice.actions;
export default postSlice.reducer;
