import * as Yup from "yup";
import { ValidationMessage } from "./schemaConstants";
import validationSchemas from "./validationSchema";

export const FILE_SIZE: number = 3 * 1024 * 1024; // 3MB
export const SUPPORTED_FORMATS: string[] = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];
// kyc validation schema
export const kycSchema = Yup.object({
  documentType: Yup.string().required("Required"),
  documentNumber: Yup.string()
    .required("Required")
    .min(7, "Must be more than 7")
    .max(15, "Must be less than 15"),
  documentFront: Yup.mixed()
    .required("Required")
    .test(
      "fileSize",
      "File size is too large. Maximum size is 3MB",
      (value: any) => {
        return value && value?.size <= FILE_SIZE;
      }
    )
    .test(
      "fileFormat",
      "Unsupported Format. Only JPG, PNG, JPEG are allowed",
      (value: any) => {
        return value && SUPPORTED_FORMATS.includes(value?.type);
      }
    ),
  documentBack: Yup.mixed()
    .required("Required")
    .test(
      "fileSize",
      "File size is too large. Maximum size is 3MB",
      (value: any) => {
        return value && value.size <= FILE_SIZE;
      }
    )
    .test(
      "fileFormat",
      "Unsupported Format. Only JPG, PNG, JPEG are allowed",
      (value: any) => {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    ),
  selfie: Yup.mixed()
    .required("Required")
    .test(
      "fileSize",
      "File size is too large. Maximum size is 3MB",
      (value: any) => {
        return value && value.size <= FILE_SIZE;
      }
    )
    .test(
      "fileFormat",
      "Unsupported Format. Only JPG, PNG, JPEG are allowed",
      (value: any) => {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    ),
});

// signup page validation schema
export const signupSchema = Yup.object().shape({
  firstName: validationSchemas.firstName,
  lastName: validationSchemas.lastName,
  email: validationSchemas.email,
  phoneNumber: validationSchemas.phoneNumber,
  password: validationSchemas.password,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null as never], "Passwords must match")
    .required("Required"),
  countryId: Yup.string().required("Required"),
  isChecked: Yup.bool().oneOf([true], 'Required')
});

// otp validation schema
export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Please enter security code")
    .matches(/^\d{6}$/, "Security code must be 6 digits"),
});
//2FA otp validation schema
export const twoFaOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Please enter security code")
    .matches(/^\d{6}$/, "Security code must be 6 digits"),
  token: Yup.string()
    .required("Please enter google authenticator security code")
    .matches(/^\d{6}$/, "Security code must be 6 digits"),
});

// login validation schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .matches(/^(?! ).*(?<! )$/),
  password: Yup.string().required("Required"),
});

// withdraw validation schema
export const withdrawModalSchema = Yup.object().shape({
  amount: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

//profile page schema
export const profileValidationSchema = Yup.object({
  firstName: validationSchemas.firstName,
  lastName: validationSchemas.lastName,
  gender: Yup.string().required("Required"),
  address: validationSchemas.address,
  city: Yup.string().required("Required").min(2, "Too short"),
  state: Yup.string().required("Required"),
  dob: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Required"),
  postCode: Yup.number().required("Required").min(3, "Too short"),
  profileImage: Yup.mixed().required("Required"),
});
