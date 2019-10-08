import { GET_LOCATIONS_START, GET_ROUTES_START } from '../../consts/actionTypes';

export const getLocations = payload => ({
  type: GET_LOCATIONS_START,
  payload
});

export const getRoutes = payload => ({
  type: GET_ROUTES_START,
  payload
});
