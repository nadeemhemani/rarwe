import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { buildValidations } from 'ember-cp-validations';
import emailFieldValidation from 'rarwe/validations/email-field';
import passwordFieldValidation from 'rarwe/validations/password-field';

const Validations = buildValidations({
  email: emailFieldValidation,
  password: passwordFieldValidation
});

export default Controller.extend(Validations, {
  init() {
    this._super(...arguments);
    this.set('showErrors', { email: false, password: false });
  },
  session: service(),
  router: service(),
  signIn: action(async function (event) {

    event.preventDefault();
    let { email, password } = this;

    await this.session.authenticate('authenticator:credentials',
      email, password);

    await this.model.save();
    await this.router.transitionTo('bands');
  }),
  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set('showErrors', showErrors);
  }),
  resetBaseErrors: action(function () {
    this.set('baseErrors', []);
  })


});