import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import dummyServiceData from "../data/dummyServiceData";

// Create slice
export const serviceSlice = createSlice({
  name: "service",
  initialState: [],
  reducers: {
    addService: (state, action) => {
      console.log("Payload received in addService:", action.payload);
      state.services.unshift(action.payload);
    },
    setInitialPost: (state, action) => {
      return [...action.payload];
    },
    addComment: (state, action) => {
      const { serviceTitle, comment } = action.payload;
      const service = state.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (service) {
        service.comments.unshift(comment);
      }
    },
    addRating: (state, action) => {
      const { serviceTitle, rating } = action.payload;
      const service = state.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (service) {
        // Update the total ratings count and specific rating count
        service.ratings.total++;
        service.ratings[rating]++;
      }
    },
    removeComment: (state, action) => {
      const { serviceTitle, commentContent } = action.payload;
      const service = state.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (service) {
        service.comments = service.comments.filter(
          (comment) => comment.content !== commentContent
        );
      }
    },
  },
});

// Export actions
export const { setInitialPost, addService, addComment, removeComment,addRating } =
  serviceSlice.actions;

export const selectServiceSlice = (state) => state.service;

export const selectServices = createSelector(
  selectServiceSlice,
  (serviceSlice) => {
    console.log("State received in selectServices:", serviceSlice);
    return serviceSlice.services;
  }
);

export const selectServiceByTitle = (state, title) => {
  const services = selectServices(state);
  console.log("State received in selectServiceByTitle:", serviceSlice);
  return services.find((service) => service.serviceTitle === title);
};

export default serviceSlice.reducer;
