import { PASSWORD, EMAIL } from 'helpers/constants';

const emailValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push('Email is required');
  } else if (!EMAIL.regExp.test(value)) {
    errors.push('Please enter correct email');
  }
  return errors;
};

const phoneNumberValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push('Phone Number is required');
  }
  return errors;
};

const confirmationCodeValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push('Code is required');
  }
  return errors;
};

export const validate = (value, key) => {
  switch (key) {
    case 'email':
      return emailValidator(value);
    case 'phoneNumber':
      return phoneNumberValidator(value);
    case 'confirmationCode':
      return confirmationCodeValidator(value);
    default:
      return [];
  }
};

export const getServerErrors = (commonErrors, key) => {
  return commonErrors
    .filter(error => Object.keys(error)[0] === key)
    .map(error => error[key]);
};

export const containErrors = (errors) => {
  return Boolean(Object.keys(errors)
    .filter(key => errors[key].length).length);
};

export const validatePassword = password => password.length > PASSWORD.length
  && !!PASSWORD.regExp.test(password);
