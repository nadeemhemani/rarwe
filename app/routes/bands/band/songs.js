import Route from '@ember/routing/route';
//import wait from 'rarwe/utils/wait';
//import { reject } from 'rsvp';


export default Route.extend({
  model() {
    return this.modelFor('bands.band');
  },
  

  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    });
  },

});