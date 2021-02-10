import axios from 'axios';
import {
  FETCHING_STUDENTS_SUCCESS,
  SUBMIT_STUDENTS_SUCCESS,
  UPDATE_STUDENTS_SUCCESS,
  DELETE_STUDENTS_SUCCESS,
} from '../types';

// export function fetchStudents() {
//   let getStudents = fetch('http://192.168.10.6:8041/AllStudents', {
//     method: 'GET',
//     header: {
//       'Content-Type': 'applicaion/json',
//     },
//   }).then(async data => {
//     let responseJson = await data.json();

//     return responseJson;
//   });
//   return {
//     type: FETCHING_STUDENTS_SUCCESS,
//     payload: getStudents,
//   };
// }

export function fetchStudents() {
  // console.log('fetch Students from student Action');
  let getStudents = axios({
    url: 'http://192.168.10.6:8041/AllStudents',
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      return response;
    })

    .catch(error => {
      return error;
    });

  return {
    type: FETCHING_STUDENTS_SUCCESS,
    payload: getStudents,
  };
}

export function registerStudent(data) {
  let addStudents = fetch('http://192.168.10.6:8041/RegisterStudent', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    body: data,
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    })
    .catch(error => {
      console.error(error);
    });
  return {
    type: SUBMIT_STUDENTS_SUCCESS,
    payload: addStudents,
  };
}

export function updateStudent(student_id, updatdata) {
  console.log('student_id from action', student_id);
  let updateStudents = fetch(
    'http://192.168.10.6:8041/UpdateStudent/' + student_id,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: updatdata,
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    })
    .catch(error => {
      console.error(error);
    });
  return {
    type: UPDATE_STUDENTS_SUCCESS,
    payload: updateStudents,
  };
}

export function deleteStudent(student_id) {
  console.log('student_id', student_id);
  let removeStudents = fetch('http://192.168.10.6:8041/delete/' + student_id, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.success;
    });
  return {
    type: DELETE_STUDENTS_SUCCESS,
    payload: removeStudents,
  };
}
