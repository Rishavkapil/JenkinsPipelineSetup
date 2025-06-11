/** @format */

import * as Yup from "yup";
import { ValidationMessage } from "./schemaConstants";

const nameSchema = Yup.string()
  .trim()
  .required(ValidationMessage.Required)
  .min(2, ValidationMessage.nameMin)
  .max(50, ValidationMessage.nameMax);

const firstNameSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(2, ValidationMessage.nameMin)
  .max(50, ValidationMessage.nameMax)
  // Separate regex for leading/trailing spaces
  .matches(/^\S.*\S$|^\S$/, "First Name cannot start or end with a space.")
  // Main regex for the first name pattern
  .matches(/^(?=(.*[a-zA-Z]){2,})[a-zA-Z0-9_.\-']+([a-zA-Z0-9_.\-' ]*[a-zA-Z0-9_.\-'])?$/, `First Name must contain at least two alphabets.`);

const lastNameSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(2, ValidationMessage.nameMin)
  .max(50, ValidationMessage.nameMax)
  // Separate regex for leading/trailing spaces
  .matches(/^\S.*\S$|^\S$/, "First Name cannot start or end with a space.")
  // Main regex for the first name pattern
  .matches(/^(?=(.*[a-zA-Z]){2,})[a-zA-Z0-9_.\-']+([a-zA-Z0-9_.\-' ]*[a-zA-Z0-9_.\-'])?$/, `Last Name must contain at least two alphabets.`);

const subbjectSchema = Yup.string()
  .trim()
  .required(ValidationMessage.Required)
  .min(2, ValidationMessage.nameMin)
  .max(100, ValidationMessage.subjectMAx);

const aadharSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(12, ValidationMessage.AdharMin)
  .max(34, ValidationMessage.nameMax);

const phoneNumberSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(10, ValidationMessage.phoneMin)
  .max(12, ValidationMessage.phoneMax)
  .matches(
    /^(\+\d{1,4})?[\s-]?\(?(?!0+$)\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}$/,
    "Invalid mobile number"
  );

const bankAccountSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(11, ValidationMessage.bankAccountMin);

const messageSchema = Yup.string()
  .trim()
  .required(ValidationMessage.Required)
  .min(2, ValidationMessage.nameMin)
  .max(300, ValidationMessage.messageMax);

const emailSchema = Yup.string()
  .matches(/^(?! ).*(?<! )$/, "msg")
  .email(ValidationMessage.InvalidEmail)
  .required(ValidationMessage.Required)
  .max(50, ValidationMessage.emailmax)
  .matches(
    /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
    ValidationMessage.InvalidEmail
  );

const pancardSchema = Yup.string()
  .required(ValidationMessage.Required)
  .max(20, ValidationMessage.passwordMax)
  .matches(/^[A-Za-z0-9]*$/, ValidationMessage.panMatch)
  .min(10, ValidationMessage.panMin);

const passwordSchema = Yup.string()
  .required("Required")
  .min(8, "Password must be at least 8 characters")
  .max(32, "Maximum length should be 32 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
    ValidationMessage.passwordMin
  );

const confirmPasswordSchema = Yup.string()
  .required("Confirm Password Required")
  .oneOf([Yup.ref("pass")], "Confirm Password must match");

const usernameSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(4, ValidationMessage.usernameMin)
  .max(20, ValidationMessage.usernameMax);
// .matches(/^[A-Za-z0-9-_]+$/, ValidationMessage.usernameMatch);

// Assuming 1900 as the start of the reasonable range
const dateofbirthSchema = Yup.date()
  .required(ValidationMessage.Required)
  .max(new Date(), ValidationMessage.birthDateMax)
  .min(new Date(1900, 0, 1), ValidationMessage.birthDateMin)
  .typeError(ValidationMessage.birthDateError);

const addressSchema = Yup.string()
  .required(ValidationMessage.Required)
  .max(50, ValidationMessage.addressMax)
  // .matches(/^[A-Za-z0-9.'#@%&/\- ]+$/, ValidationMessage.addressMatch)
  .matches(
    // /^[a-zA-Z0-9@#.,/\\() ]*$/,
    /^[a-zA-Z0-9@#.,/\\()\- ]*$/,
    "Street address can only contain alphanumeric characters and the symbols @#.,/\\()"
  );

const zipcodeSchema = Yup.string()
  .required(ValidationMessage.Required)
  .min(6, ValidationMessage.zipcodeMin)
  .max(10, ValidationMessage.zipMax);

const ifscSchema = Yup.string()
  .required(ValidationMessage.Required)
  .matches(/^[A-Za-z0-9]*$/, ValidationMessage.panMatch)
  .min(11, ValidationMessage.ifscMin);

const tokenSchema = Yup.string()
  .required("Required")
  .min(2, ValidationMessage.nameMin)
  .max(6, ValidationMessage.tokenMax);
const otpSchema = Yup.string();

const validationSchemas = {
  name: nameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  aadhar: aadharSchema,
  pancard: pancardSchema,
  phoneNumber: phoneNumberSchema,
  bankAccount: bankAccountSchema,
  password: passwordSchema,
  username: usernameSchema,
  dateofbirth: dateofbirthSchema,
  address: addressSchema,
  zipcode: zipcodeSchema,
  ifsc: ifscSchema,
  subject: subbjectSchema,
  message: messageSchema,
  confirmPassword: confirmPasswordSchema,
  token: tokenSchema,
  otp: otpSchema,
};

export default validationSchemas;
