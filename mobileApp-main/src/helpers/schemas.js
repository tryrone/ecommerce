import * as Yup from 'yup';
import { PASSWORD } from './constants';

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .required('Password is required!')
    .min(PASSWORD.length, 'Enter correct password due to rules')
    .matches(PASSWORD.regExp, 'Enter correct password due to rules'),
  repeatPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const CreateNewPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .required('Password is required!')
    .min(PASSWORD.length, 'Enter correct password due to rules')
    .matches(PASSWORD.regExp, 'Enter correct password due to rules'),
  password: Yup.string()
    .trim()
    .required('Password is required!')
    .min(PASSWORD.length, 'Enter correct password due to rules')
    .matches(PASSWORD.regExp, 'Enter correct password due to rules'),
  repeatPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please, enter a correct email!')
    .required('Email is required!'),
  password: Yup.string().trim().required('Password is required!'),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please, enter a correct email!')
    .required('Email is required!'),
  username: Yup.string()
    .trim()
    .required('Username is required!')
    .max(255, 'Username too long'),
  password: Yup.string()
    .trim()
    .required('Password is required!')
    .min(PASSWORD.length, 'Enter correct password due to rules')
    .matches(PASSWORD.regExp, 'Enter correct password due to rules'),
});

export const SocialSignUpSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please, enter a correct email!')
    .required('Email is required!'),
  username: Yup.string()
    .trim()
    .required('Username is required!')
    .max(255, 'Username too long'),
});

export const VerifyDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('First name is required.')
    .max(255, 'First name too long'),
  lastName: Yup.string()
    .trim()
    .required('Last name is required.')
    .max(255, 'Last name too long'),
  birthDate: Yup.string().trim().required('Date of birth is required.'),
  country: Yup.string().trim().required('Country of residence is required.'),
});
