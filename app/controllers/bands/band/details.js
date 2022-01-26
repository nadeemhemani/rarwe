import Controller from '@ember/controller';
import { action } from '@ember/object';
//import { computed } from '@ember/object';

export default Controller.extend({
  isEditing: false,
  edit: action(function () {
    this.set('isEditing', true);
  }),
  init() {
    this._super(...arguments);
    this.set('showErrors', { description: false });
  },
  async save() {
    let band = this.model;
    this.set('showErrors.description', true);
    if (band.validations.isValid) {
      await band.save();
      this.set('isEditing', false);
    }
  }
});