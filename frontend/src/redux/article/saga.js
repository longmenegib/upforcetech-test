import { call, put, takeLatest } from "redux-saga/effects";
import { types } from "./types";
import {
  deleteRequest,
  getUnauthRequest,
  postUnauthRequest,
  putRequest,
} from "../../helpers/api";
import Url from "../../urls/Api_url";
import { toast } from "react-toastify";

function* article({ payload }) {
  try {
    const res = yield getUnauthRequest(`${Url}/articles`);
    if (res.ret) {
      yield put({ type: types.GET_SUCCESS, payload: res.articles });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: types.GET_FAILURE, payload: "Error performing request" });
  }
}

function* deleteArticle({ payload }) {
  try {
    const res = yield deleteRequest(`${Url}/articles/${payload._id}`);
    if (res.ret) {
      toast.success("Article removed successfully.");
      yield put({ type: types.DELETE_SUCCESS, payload: res });
      yield call(article, {});
    } else {
      toast.error("Article not deleted.");
    }
  } catch (error) {
    toast.error("Article not deleted.");
  }
}

function* getOneArticle({ payload }) {
  try {
    const res = yield getUnauthRequest(`${Url}/articles/${payload._id}`);
    if (res.ret) {
      yield put({ type: types.GET_ONE_SUCCESS, payload: res.article });
    } else {
      toast.error("Can't find article.");
      yield put({ type: types.GET_FAILURE, payload: "Error performing request" });
    }
  } catch (error) {
    toast.error("Error fetching article.");
    yield put({ type: types.GET_FAILURE, payload: "Error performing request" });
  }
}

function* updateArticle({ payload }) {
  try {
    const res = yield putRequest(
      `${Url}/articles/${payload._id}`,
      JSON.stringify(payload)
    );
    if (res.ret) {
      toast.success("Article updated successfully.");
      yield call(article, {});
      yield put({ type: types.PUT_SUCCESS, payload: res });
    } else {
      toast.error("Article not updated.");
    }
  } catch (error) {
    toast.error("Article not updated.");
  }
}

function* postArticle({ payload }) {
  try {
    const res = yield postUnauthRequest(
      `${Url}/articles`,
      JSON.stringify(payload)
    );
    if (res.ret) {
      yield call(article, {});
      toast.success("Article has been added successfully.");
      yield put({ type: types.POST_SUCCESS, payload: res });
    } else {
      toast.error("Article not created.");
    }
  } catch (error) {
    toast.error("Article not created.");
  }
}

export default function* ArticleSaga() {
  yield takeLatest(types.GET_REQUEST, article);
  yield takeLatest(types.DELETE_REQUEST, deleteArticle);
  yield takeLatest(types.POST_REQUEST, postArticle);
  yield takeLatest(types.PUT_REQUEST, updateArticle);
  yield takeLatest(types.GET_ONE_REQUEST, getOneArticle);
}
