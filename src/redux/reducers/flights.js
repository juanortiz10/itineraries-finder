import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR
} from "../../consts/actionTypes";

export default function(state = {} , action) {
  switch (action.type) {
    case GET_LOCATIONS_START:
      return { ...state };
      break;
    case GET_LOCATIONS_ERROR:
      return { ...state };
      break;
    case GET_LOCATIONS_COMPLETE:
      return { ...state };
      break;
    default:
      return { ...state };
  }
}
