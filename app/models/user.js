import Model, { attr } from '@ember-data/model';
import { buildValidations } from 'ember-cp-validations';
import emailFieldValidation from 'rarwe/validations/email-field';
import passwordFieldValidation from 'rarwe/validations/password-field';


const Validations = buildValidations({
  // I removed the validations that are now defined in their own file
  email: emailFieldValidation,
  password: passwordFieldValidation
  });

export default Model.extend(Validations, {
  email: attr(),
  password: attr(),
});
