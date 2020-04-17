import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // Wir benutzen call statt normalem Funktionsaufruf, weil call ein "Blocking Effect"
    // ist, d.h. die Saga machts nichts bis convert... fertig ist.
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // Put ist ein "non-blocking effect", der eine action dispatcht. Darauf müssen wir
    // nicht warten.
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
