// imports the packages
import axios from 'axios';

// imports the redux action
import { setAlert } from './alert';

// imports the redux types
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// gets posts
export const getPosts = () => async (dispatch) => {
  try {
    // holds the response from axios
    const res = await axios.get('api/posts');

    // dispatches the redux action get posts
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// adds a like
export const addLike = (id) => async (dispatch) => {
  try {
    // holds the response from axios
    const res = await axios.put(`api/posts/like/${id}`);

    // dispatches the redux action update likes
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// removes a like
export const removeLike = (id) => async (dispatch) => {
  try {
    // holds the response from axios
    const res = await axios.put(`api/posts/unlike/${id}`);

    // dispatches the redux action update likes
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes a post
export const deletePost = (id) => async (dispatch) => {
  try {
    // await the axios delete request to resolve
    await axios.delete(`api/posts/${id}`);

    // dispatches the redux action delete post
    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    // dispatches the redux action set alert with a custom message
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// adds a post
export const addPost = (formData) => async (dispatch) => {
  try {
    // holds the config for axios post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // holds the response from axios post request
    const res = await axios.post('api/posts', formData, config);

    // dispatches the redux action add post
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    // dispatches the redux action set alert with a custom message
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// gets a single post
export const getPost = (id) => async (dispatch) => {
  try {
    // holds the response from the axios get request
    const res = await axios.get(`/api/posts/${id}`);

    // dispatches the redux action get post
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// adds a comments
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    // holds the config for the axios post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // holds the response from axios post request
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    // dispatches the redux action add comment
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    // dispatches the redux action set alert with a custom message
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes a comments
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    // awaits the delete request from axios
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    // dispatches the redux action remove comment
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    // dispatches the redux action set alert with a custom message
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    // dispatches the redux action post error if we encountered an error
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
