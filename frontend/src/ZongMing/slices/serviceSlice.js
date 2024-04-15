import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
// import dummyServiceData from "../data/dummyServiceData";

// Create slice
export const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
  },
  reducers: {
    addService: (state, action) => {
      return [action.payload, ...state];
    },
    setInitialServices: (state, action) => {
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

    editService: (state, action) => {
      const { serviceTitle, updates } = action.payload;
      const index = state.findIndex(
        (service) => service.serviceTitle === serviceTitle
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
    removeService: (state, action) => {
      console.log("hi");
      const { serviceTitle } = action.payload;
      return state.filter((service) => service.serviceTitle !== serviceTitle);
    },
  },
});

// Export actions
export const {
  setInitialServices,
  addService,
  addComment,
  removeComment,
  addRating,
  editService,
  removeService,
} = serviceSlice.actions;

export const selectServiceSlice = (state) => state.service;

export const selectServices = createSelector(
  selectServiceSlice,
  (serviceSlice) => {
    return serviceSlice.services;
  }
);

export const selectServiceByTitle = (state, title) => {
  const services = selectServices(state);
  console.log("State received in selectServiceByTitle:", serviceSlice);
  return services.find((service) => service.serviceTitle === title);
};

export default serviceSlice.reducer;
