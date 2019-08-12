import { SET_CODE, SET_HISTORY, SET_CLIENT, ON_MESSAGE } from '../types'
// import testcode from '../../assets/testcode'

const initialState = {
  code: "// Live editor ...",
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
    case SET_CODE:
      return {
          ...state,
          code: action.payload
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