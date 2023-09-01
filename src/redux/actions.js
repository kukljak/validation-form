import * as actionTypes from './actionTypes';

export const setLastName = (lastName) => {
  return {
    type: actionTypes.SET_LAST_NAME,
    payload: lastName,
  };
};

export const setFirstName = (firstName) => {
  return {
    type: actionTypes.SET_FIRST_NAME,
    payload: firstName,
  };
};

export const setEmail = (email) => {
  return {
    type: actionTypes.SET_EMAIL,
    payload: email,
  };
};

export const setMessage = (message) => {
  return {
    type: actionTypes.SET_MESSAGE,
    payload: message,
  };
};