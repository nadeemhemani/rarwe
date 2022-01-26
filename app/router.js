import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { capitalize } from '@ember/string';
import { capitalize as capitalizeWords } from 'rarwe/helpers/capitalize';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  init() {
    this._super();
    this.setDocumentTitle();
  },
  setDocumentTitle() {
    this.on('routeDidChange', (transition) => {
      if (!transition.to) {
        return;
      }
      let toRouteName = transition.to.name;
      let pageTitles = {
        'bands.index': () => {
          return 'Bands';
        },
        'bands.band.songs': () => {
          let bandRouteInfo = transition.to.find(info =>
            info.name.includes('bands.band'));
          let bandId = bandRouteInfo.params.id;
          let bandName = bandId.split('-').map(s =>
            capitalize(s)).join(' ');
            return `${capitalizeWords(bandName)} songs`;
        }
      }
      let titleSegments = [];
      let titleSetter = pageTitles[toRouteName];
      if (titleSetter) {
        titleSegments.push(titleSetter());
      }
      titleSegments.push('Rock and Roll with Ember.js');
      document.title = titleSegments.join(' - ');
    });
  }
});

Router.map(function () {
  this.route('bands', function () {
    this.route('band', { path: ':id' }, function () {
      this.route('songs');
      this.route('details');
    });
  });
  this.route('sign-up');
  this.route('login');
  this.route('logout');
});

export default Router;