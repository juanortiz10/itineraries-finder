import { GET_LOCATIONS_START } from '../../consts/actionTypes';

export const getLocations = payload => ({
  type: GET_LOCATIONS_START,
  payload
});
