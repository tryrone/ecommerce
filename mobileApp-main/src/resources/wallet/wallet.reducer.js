import {
  SELECT_PHONE_NUMBER,
  SET_PHONE_NUMBERS,
  REMOVE_PHONE_NUMBER,
  ADD_PHONE_NUMBER,
} from './wallet.constants';

const initialState = {
  phoneNumbers: [],
  selectedPhoneNumberId: null,
};

const removeMobilePhone = (phoneNumbers, removePhoneId) =>
  phoneNumbers.filter(({ _id }) => _id !== removePhoneId);

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PHONE_NUMBER:
      return {
        ...state,
        selectedPhoneNumberId: action.payload,
      };
    case SET_PHONE_NUMBERS: {
      return {
        ...state,
        phoneNumbers: action.payload,
      };
    }
    case ADD_PHONE_NUMBER: {
      return {
        ...state,
        phoneNumbers: [...state.phoneNumbers, action.payload],
        selectedPhoneNumberId: action.payload._id,
      };
    }
    case REMOVE_PHONE_NUMBER:
      return {
        ...state,
        phoneNumbers: removeMobilePhone(state.phoneNumbers, action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};
