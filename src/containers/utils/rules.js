/**
 * Created by mandy on 5/10/17.
 */

import  * as ErrorMessages from './errorMessages';
let validator = require('validator');

export const required = (text, fieldName) => {
  return text ? null : ErrorMessages.isRequired(fieldName);
};

export const checkEmail = (text) => {

  return (validator.isEmail(text)) ? null : ErrorMessages.isEmail(text);

};

export const checkWebsite = (text) => {

  return (validator.isURL(text)) ? null : ErrorMessages.isWebsite(text)

};

export const maxLength = (text, fieldName) =>{

  return text.length == 4 ? null : `${fieldName} must be of 4 digits`
};


export const isNumber = (text, field) => {

  return (isNaN(text)) ? ErrorMessages.notNumber(field) : null;
};



