import { SET_FORM_DATA } from './actionTypes';

const initialState = {
  lastName: '',
  firstName: '',
  email: '',
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return { ...state, ...action.payload};

    default:
      return state;
  }
};

export default reducer;
