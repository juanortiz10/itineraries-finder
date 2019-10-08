import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR,
  GET_ROUTES_START,
  GET_ROUTES_ERROR,
  GET_ROUTES_SUCCESS
} from "../../consts/actionTypes";

export default function(state = {} , action) {
  switch (action.type) {
    case GET_LOCATIONS_START:
      return { ...state, places: null };
      break;
    case GET_LOCATIONS_ERROR:
      return { ...state, places: null };
      break;
    case GET_LOCATIONS_COMPLETE:
      return { ...state, places: action.results };
      break;
    case GET_ROUTES_START:
      return { ...state, routes: null };
      break;
    case GET_ROUTES_ERROR:
      return { ...state, routes: null };
      break;
    case GET_ROUTES_SUCCESS:
      return { ...state, routes: action.results };
      break;
    default:
      return { ...state };
  }
}
