import { put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR
} from "../../consts/actionTypes";
import apiCall from '../api';

export function* getLocations({ payload }) {
  try {
    const { country, currency, locale, query } = payload;
    const url = `/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${query}`;
    const results = yield call(apiCall, url, 'GET');

    console.log(results);
    yield put({ type: GET_LOCATIONS_COMPLETE, results: [] });
  } catch (error) {
    yield put({ type: GET_LOCATIONS_ERROR, error });
  }
}

export default function* flights() {
  yield takeLatest(GET_LOCATIONS_START, getLocations);
}
