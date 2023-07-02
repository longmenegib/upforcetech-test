import { all } from 'redux-saga/effects';
import ArticleSaga from '../article/saga';

/**

 * @description combine sagas.

 */

export default function* Sagas() {
  yield all([ArticleSaga()]);
}
