import { types } from "./types";

/**
 * @description get request.
 * knowing that our action takes payload: {type, params}
 * type: POST, PUT, DELETE, GET, GETALL
 */



export const listArticles = () => ({
	type: types.GET_REQUEST,
})

export const deleteArticle = (payload) => ({
	type: types.DELETE_REQUEST,
	payload
})

export const postArticle = (payload) => ({
	type: types.POST_REQUEST,
	payload
})

export const updateArticle = (payload) => ({
	type: types.PUT_REQUEST,
	payload
})

export const getOneArticle = (payload) => ({
	type: types.GET_ONE_REQUEST,
	payload
})