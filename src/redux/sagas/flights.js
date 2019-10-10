import { put, call, takeLatest } from "redux-saga/effects";

import {
  GET_LOCATIONS_START,
  GET_LOCATIONS_COMPLETE,
  GET_LOCATIONS_ERROR,
  GET_ROUTES_START,
  GET_ROUTES_ERROR,
  GET_ROUTES_SUCCESS
} from "../../consts/actionTypes";
import apiCall from "../api";

const country = "MX";
const currency = "USD";
const locale = "en-US";

export function* getLocations({ payload }) {
  try {
    const { query } = payload;
    const url = `/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${query}`;
    const results = yield call(apiCall, url, "GET");

    if (results.data && results.data.Places) {
      yield put({ type: GET_LOCATIONS_COMPLETE, results: results.data.Places });
    }
  } catch (error) {
    yield put({ type: GET_LOCATIONS_ERROR, error });
  }
}

export function* getRoutes({ payload }) {
  try {
    const {
      originPlace,
      destinationPlace,
      outboundDate,
      inboundDate,
      adults,
      children,
      cabinClass
    } = payload;

    const headers = {
      "content-type": "application/x-www-form-urlencoded"
    };

    const body = {
      inboundDate,
      cabinClass,
      children,
      country,
      currency,
      locale,
      originPlace,
      destinationPlace,
      outboundDate,
      adults
    };

    const sessionResult = yield call(apiCall, '/pricing/v1.0', 'POST', new URLSearchParams(body), headers);
    const locationHeader = sessionResult.headers.location;

    if (locationHeader) {
      const sessionToken = locationHeader.substring(locationHeader.lastIndexOf('/') + 1, locationHeader.length);
      const pollSessionResults = yield call(apiCall, `/pricing/uk2/v1.0/${sessionToken}?pageIndex=0&pageSize=11`, 'GET');

      if (!pollSessionResults) {
        yield put({ type: GET_ROUTES_ERROR, error: 'Something went wrong!' });
      }

      yield put({ type: GET_ROUTES_SUCCESS, results: pollSessionResults.data });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: GET_ROUTES_ERROR, error });
  }
}

export default function* flights() {
  yield takeLatest(GET_LOCATIONS_START, getLocations);
  yield takeLatest(GET_ROUTES_START, getRoutes);
}
