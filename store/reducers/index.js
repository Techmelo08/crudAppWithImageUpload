import {combineReducers} from 'redux';
import Student from './studentsReducer';

const rootReducer = combineReducers({
  Student,
});

//console.log('StudentStudentStudent', store.getState());
export default rootReducer;
