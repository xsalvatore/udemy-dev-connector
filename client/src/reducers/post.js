// imports the redux action types
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../actions/types';

// holds the initial state
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  // destructures the action
  const { type, payload } = action;

  switch (type) {
    // gets all the posts
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    // gets a single post
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    // adds a single post
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    // deletes a single post
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    // logs an error message for the post
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    // updates the ammount of likes on a post
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    // adds a comment on a post
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    // removes a comment on a post
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    // returns the state as a default case
    default:
      return state;
  }
}
