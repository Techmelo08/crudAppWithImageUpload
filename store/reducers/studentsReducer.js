import {
  FETCHING_STUDENTS_SUCCESS,
  SUBMIT_STUDENTS_SUCCESS,
  UPDATE_STUDENTS_SUCCESS,
} from '../types';

export default function(state = [], action) {
  // console.log('action is', action.payload);
  switch (action.type) {
    case FETCHING_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    case SUBMIT_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case UPDATE_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state;
  }
}
