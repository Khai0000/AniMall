import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const serviceSlice = createSlice({
  name: "services",
  initialState: [],
  reducers: {
    setInitialServices: (state, action) => {
      return [...action.payload];
    },
    addService: (state, action) => {
      return [action.payload, ...state];
    },
    addComment: (state, action) => {
      const { serviceId, serviceComments } = action.payload;
      const service = state.find((service) => service._id === serviceId);
      if (service) {
        service.serviceComments.unshift(serviceComments);
      }
    },
    addRating: (state, action) => {
      const { serviceTitle, serviceRating } = action.payload;
      const service = state.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (service) {
        service.serviceRating.total++;
        service.serviceRating[serviceRating]++;
      }
    },
    removeComment: (state, action) => {
      const { serviceId, commentId } = action.payload;
      const service = state.find((service) => service._id === serviceId);
      if (service) {
        service.serviceComments = service.serviceComments.filter(
          (comment) => comment._id !== commentId
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
      return state.filter((service) => service._id !== action.payload);
    },
    hideService(state, action) {
      const { serviceId } = action.payload;
      const existingService = state.find(
        (service) => service._id === serviceId
      );
      if (existingService) {
        existingService.hidden = !existingService.hidden;
      }
    },
  },
});
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
