import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
// import dummyServiceData from "../data/dummyServiceData";

// Create slice
export const serviceSlice = createSlice({
  name: "services",
  initialState: null,
  reducers: {
    setInitialServices: (state, action) => {
      return [...action.payload];
    },
    addService: (state, action) => {
      return [action.payload, ...state];
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
      const { serviceId, updatedService } = action.payload;
      const index = state.findIndex(
        (service) => service.serviceId === serviceId
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedService };
      }
    },
    removeService: (state, action) => {
      return state.filter((service) => service.serviceTitle !== action.payload);
    },
    hideService(state, action) {
      const { serviceTitle } = action.payload;
      const existingService = state.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (existingService) {
        existingService.hidden = !existingService.hidden;
      }
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
  hideService,
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
