import * as yup from 'yup';

export const RegisterValidation = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
})

export const loginValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email format.')
    .required('Email is required.'),
  password: yup.string()
    .required('Password is required.'),
});

export const profileValidation = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const addressValidation = yup.object({
  name: yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),

  phone: yup.string()
    .trim()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be 10 digits'),

  addressline1: yup.string()
    .trim()
    .required('Address Line 1 is required'),

  city: yup.string()
    .trim()
    .required('City is required'),

  state: yup.string()
    .trim()
    .required('State is required'),

  pincode: yup.string()
    .trim()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
});