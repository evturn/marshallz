import {
  GET_BOTS_BEGIN,
  GET_BOTS_SUCCESS,
  GET_BOTS_ERROR
} from 'constants';


export default function bot(state={ marshall: {}, clang: {} }, action) {
  switch (action.type) {
    case GET_BOTS_BEGIN:
      return {
        isFetching: true
      };
    case GET_BOTS_SUCCESS:
      return {
        bots: action.bots,
        isFetching: false
      };
    case GET_BOTS_ERROR:
      return {
        isFetching: false
      };
    default:
      return state;
  }
}