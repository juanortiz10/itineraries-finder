import { put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR
} from "../../consts/actionTypes";

export function* getLocations({ payload }) {
  try {
    // const results = yield call(apiCall, `&s=${payload.movieName}`, null, null, 'GET');
    yield put({ type: GET_LOCATIONS_COMPLETE, results: [] });
  } catch (error) {
    yield put({ type: GET_LOCATIONS_ERROR, error });
  }
}

export default function* flights() {
  yield takeLatest(GET_LOCATIONS_START, getLocations);
}
