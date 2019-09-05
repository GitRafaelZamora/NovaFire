import { SET_CONTENT, SET_HISTORY, SET_CLIENT, ON_MESSAGE } from '../types'
// import testcode from '../../assets/testcode'

const initialState = {
  content: localStorage.getItem("content"),
  documentHistory: [],
  currentUsers: [],
  client: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLIENT:
      return {
          ...state,
          client: action.payload
      };
    case ON_MESSAGE:
      return {
          ...state,
          ...action.payload
      };
    case SET_CONTENT:
      return {
          ...state,
          content: action.payload
      };
    case SET_HISTORY:
      return {
          ...state,
          documentHistory: action.payload
      };
    default:
      return state
  }
}