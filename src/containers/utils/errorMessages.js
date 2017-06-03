/**
 * Created by mandy on 5/10/17.
 */

export const isRequired = fieldName => `${fieldName} is required`;

export const notNumber = fieldName => `${fieldName} must be a number`;

export const isEmail = email => `${email} is not a valid Email`;

export const isWebsite = website => `${website} is not a valid URL`;
