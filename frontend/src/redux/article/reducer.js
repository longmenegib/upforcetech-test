import { types } from "./types";

const initialState = {
  loading: false,
  error: null,
  data: null,
  article: null,
  loading_action: false,
};

const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SUCCESS:
      return { loading: false, data: action.payload };

    case types.GET_REQUEST:
      return { ...state, loading: true };

    case types.GET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loading_action: false,
      };

    case types.GET_ONE_REQUEST:
      return { ...state, loading: true };
    case types.GET_ONE_SUCCESS:
      return { ...state, loading: false, article: action.payload };

    case types.PUT_REQUEST:
      return { ...state, loading_action: true };

    case types.POST_REQUEST:
      return { ...state, loading_action: true };

    case types.PUT_SUCCESS:
      return { ...state, loading_action: false };

    case types.POST_SUCCESS:
      return { ...state, loading_action: false };
    default:
      return state;
  }
};

export default ArticleReducer;
