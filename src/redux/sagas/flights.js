import { put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR
} from "../../consts/actionTypes";
import apiCall from '../api';

const country = 'MX';
const currency = 'USD';
const locale = 'en-US';

export function* getLocations({ payload }) {
  try {
    const { query } = payload;
    console.log(payload);
    const url = `/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${query}`;
    const results = yield call(apiCall, url, 'GET');

    if (results && results.Places) {
      yield put({ type: GET_LOCATIONS_COMPLETE, results: results.Places });
    }
  } catch (error) {
    yield put({ type: GET_LOCATIONS_ERROR, error });
  }
}

export default function* flights() {
  yield takeLatest(GET_LOCATIONS_START, getLocations);
}
