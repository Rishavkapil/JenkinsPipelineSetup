/** @format */

export const ValidationMessage = {
  Required: "Required",
  InvalidEmail: "Please enter valid email",
  emailmax: "Maximum 50 characters are allowed",
  AdharMin: "Miminum 12 digits are allowed",
  panMin: "Miminum 10 characters are allowed",
  phoneNumber: "Invalid phone number",
  phoneMin: "Too short",
  phoneMax: "Too large ",

  bankAccountMin: "Minimum 11 digits are allowed",
  nameMin: "Minimum 2 characters are allowed",
  nameMax: "Maximum 50 characters are allowed",

  passwordMin:
    "Password must include an uppercase letter, lowercase letter, digit, special character, and no spaces.",
  passwordMax: "Maximum 20 characters are allowed",
  passwordMini: "Minimum 8 characters are allowed",
  usernameMin: "Minimum 4 characters are allowed",
  usernameMax: "Maximum 20 characters are allowed",
  usernameMatch:
    "Username can only contain letters, numbers, hyphen, and underscore.",
  birthDateMax: "Birthdate cannot be in the future.",
  birthDateMin: "Birthdate is not within a reasonable range.",
  birthDateError: "Invalid date format. Use MM/DD/YYYY.",
  addressMatch: "Address contains invalid characters.",
  zipcodeMin: "Minimum 6 digits are allowed",
  zipMax: "Maximum 10 digits are allowed",
  panMatch:
    "Field must be alphanumeric without any spaces or special characters.",
  ifscMin: "Miminum 11 characters are allowed",
  tokenMax: "Minimum 6 characters are allowed",
  subjectMAx: "Maximum 100 characters are allowed",
  messageMax: "Maximum 300 characters are allowed",
  addressMax: "Maximum 50 characters are allowed",

};

export const FIELDS: Record<string, string> = {
  NAME: "name",
  EMAIL: "email",
  ADHAR: "adhar",
  ZIPCODE: "zipcode",
  BANKACCOUNT: "bankAccount",
  PANCARD: "pancard",
  SUBJECT: "subject",
  MESSAGE: "message",
  PASSWORD: "password",
  CONFIRMPASSWORD: "confirmPassword",
  TOKEN: "token",
};
