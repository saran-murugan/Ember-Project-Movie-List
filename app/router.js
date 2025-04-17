import EmberRouter from '@ember/routing/router';
import config from 'ember-project/config/environment';

const Router = class extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
};

Router.map(function () {
  this.route('movies', function () {
    this.route('create');
    this.route('edit', { path: '/edit/:movie_id' });
    this.route('demo-page');
  });
});

export default Router;
