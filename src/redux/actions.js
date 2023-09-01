import { SET_FORM_DATA } from './actionTypes';

export const setForm = (formData) => {
  return {
    type: SET_FORM_DATA,
    payload: formData,
  };
};
