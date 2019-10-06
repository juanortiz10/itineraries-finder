import { all } from 'redux-saga/effects';
import flights from './flights';

export default function* rootSaga() {
	yield all([ flights() ]);
}
