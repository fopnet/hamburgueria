import React from 'react';
import Input from '../components/UI/Input/Input';

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

/** *******************************
 * Form Methods
 ********************************* */

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    // eslint-disable-next-line max-len
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

const formElementsToArray = (form) => {
  const formElementsArray = [];
  for (const key in form) {
    if (Object.prototype.hasOwnProperty.call(form, key)) {
      formElementsArray.push({
        id: key,
        config: form[key],
      });
    }
  }

  return formElementsArray;
};

const inputChangedHandler = (
  event,
  inputIdentifier,
  updatedOrderForm,
  setStateCallback,
) => {
  const updatedFormElement = {
    ...updatedOrderForm[inputIdentifier],
  };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation,
  );
  updatedFormElement.touched = true;
  updatedOrderForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;
  for (const key in updatedOrderForm) {
    if ({}.hasOwnProperty.call(updatedOrderForm, key)) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
  }
  setStateCallback(updatedOrderForm, formIsValid);

  // this.setState({ [formName]: updatedOrderForm, formIsValid: formIsValid });
};

export const createInputForm = (formConfig, setStateCallback) => {
  const formElementsArray = formElementsToArray(formConfig);

  return formElementsArray.map((formElement) => {
    const updatedForm = {
      ...formConfig,
    };

    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(
          event,
          formElement.id,
          updatedForm,
          setStateCallback,
        )}
      />
    );
  });
};

export const generateFormData = (formConfig) => {
  const formData = {};
  for (const key in formConfig) {
    if ({}.hasOwnProperty.call(formConfig, key)) {
      formData[key] = formConfig[key].value;
    }
  }
  return formData;
};
